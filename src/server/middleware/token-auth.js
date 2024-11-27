const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('bearer ')) {
    return res.status(401).end();
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).end();
    }

    if (!decoded.email || typeof decoded.admin !== 'boolean') {
      return res.status(401).end();
    }

    req.user = decoded;
    next();
  });
}

module.exports = { authenticateToken };
