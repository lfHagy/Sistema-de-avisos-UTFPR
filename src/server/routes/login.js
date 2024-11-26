const express = require("express");
const Usuario = require("../db/usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (typeof senha !== 'string') {
      return res.status(400).json({ mensagem: "Senha precisa ser uma string" });
    }

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ mensagem: "Email e/ou senha invalidos" });
    }

    const loginMatches = await bcrypt.compare(senha, usuario.senha);
    if (!loginMatches) {
      return res.status(401).json({ mensagem: "Email e/ou senha invalidos" });
    }

    const token = jwt.sign(
      { email: usuario.email, nome: usuario.nome },
      secretKey,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ mensagem: "Erro no servidor", error: err.message });
  }
});

module.exports = router;
