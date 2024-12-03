const express = require("express");
const Usuario = require("../db/usuario");
const { authenticateToken } = require("../middleware/authenticateToken");
const router = express.Router();

router.post("/", async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
  }

  try {
    const existingUser = await Usuario.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ mensagem: "E-mail já cadastrado" });
    }

    const newUser = new Usuario({
      nome,
      email,
      senha,
    });    

    await newUser.save();

    res.status(201).end();
  } catch (err) {
    res.status(500).json({ mensagem: "Erro no servidor", error: err.message });
  }
});

// requests need a token from here on out
router.use(authenticateToken);

router.get("/", async (req, res) => {
  try {
    const usuarios = await Usuario.find({}, { __v: 0 });
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ mensagem: "Erro no servidor", error: err.message });
  }
});

router.get("/:email", async (req, res) => {
  try {
    const usuario = await Usuario.findOne({ email: req.params.email }, { _id: 0, __v: 0 });
    if (!usuario) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ mensagem: "Erro no servidor", error: err.message });
  }
});

router.put("/:email", async (req, res) => {
  const { nome, senha } = req.body;

  if (!nome || !senha) {
    return res.status(400).json({ mensagem: "Dados invalidos" });
  }

  try {
    const updatedUser = await Usuario.findOneAndUpdate(
      { email: req.params.email },
      { nome: nome, senha: senha },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    res.json({
      nome: updatedUser.nome,
      senha: updatedUser.senha
    });
  } catch (err) {
    res.status(500).json({ mensagem: "Erro no servidor", error: err.message });
  }
});


router.delete("/:email", async (req, res) => {
  try {
    const deletedUser = await Usuario.findOneAndDelete({
      email: req.params.email,
    });
    if (!deletedUser) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }
    res.status(200).end();
  } catch (err) {
    res.status(500).json({ mensagem: "Erro no servidor", error: err.message });
  }
});

module.exports = router;
