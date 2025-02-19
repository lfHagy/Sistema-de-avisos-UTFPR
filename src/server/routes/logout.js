const express = require("express");
const jwt = require("jsonwebtoken");
const { activeUsers } = require("./login");
const secretKey = process.env.JWT_SECRET;
const router = express.Router();

router.post("/", (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(400).json({ mensagem: "Token necessário" });
    }

    const decoded = jwt.verify(token, secretKey);
    const email = decoded.email;

    const index = activeUsers.findIndex(user => user.token === token);
    if (index !== -1) {
      activeUsers.splice(index, 1);
    }

    res.status(200).json({ mensagem: "Logout bem-sucedido" });
  } catch (err) {
    res.status(401).json({ mensagem: "Token inválido ou expirado" });
  }
});

module.exports = router;
