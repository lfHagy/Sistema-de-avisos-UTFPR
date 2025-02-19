const express = require("express");
const Usuario = require("../db/usuario");
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;
const router = express.Router();

const activeUsers = [];

router.post("/", async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario || usuario.senha !== senha) {
      return res.status(401).json({ mensagem: "Email e/ou senha inválidos" });
    }

    const token = jwt.sign(
      { email: usuario.email, admin: usuario.admin, exp: Math.floor(Date.now() / 1000) + 10 * 60 },
      secretKey,
      { algorithm: "HS256" }
    );
    // evitar que o usuário se duplique e guardar a nova token
    const index = activeUsers.findIndex(user => user.email === email);
    if (index !== -1) {
      clearTimeout(activeUsers[index].timeout);
      activeUsers.splice(index, 1);
    }

    const timeout = setTimeout(() => {
      const removeIndex = activeUsers.findIndex(user => user.email === email);
      if (removeIndex !== -1) {
        activeUsers.splice(removeIndex, 1);
        console.warn(`Token do usuário expirou: ${email}`);
      }
    }, 15 * 60 * 1000);

    activeUsers.push({ email, token, timeout });

    res.status(200).json({ token });
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ mensagem: "Erro no servidor", error: err.message });
  }
});

module.exports = {
  router,
  activeUsers
};
