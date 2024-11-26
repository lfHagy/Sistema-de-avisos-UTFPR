const express = require("express");
const Usuario = require("../db/usuario");
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
      nome: req.body.nome,
      email: req.body.email,
      senha: req.body.senha,
    });    

    await newUser.save();

    res.status(201).json({ mensagem: "Usuário criado com sucesso", usuario: newUser });
  } catch (err) {
    res.status(500).json({ mensagem: "Erro no servidor", error: err.message });
  }
});


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
    const usuario = await Usuario.findOne({ email: req.params.email });
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
      { name: nome, password: senha },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    res.json({ nome: updatedUser.name, senha: updatedUser.password });
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
