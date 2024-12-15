const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ mensagem: "Token não fornecido" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ mensagem: "Token inválido" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ mensagem: "Token inválido ou expirado" });
    }
    req.user = user;
    next();
  });
};

const authenticateAdmin = (req, res, next) => {
    if (req.user && req.user.admin) {
      return next();
    } else {
      return res.status(403).json({ mensagem: "Voce nao tem permissao suficiente para performar esta acao" });
    }
  };

module.exports = { authenticateToken, authenticateAdmin };
