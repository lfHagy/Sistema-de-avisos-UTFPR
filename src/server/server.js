require('dotenv').config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const app = express();
const readline = require('readline');
const usuariosRoutes = require('./routes/usuarios');
const loginRoutes = require('./routes/login');
const logoutRoutes = require('./routes/logout');

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(morgan('combined'));
app.use('/usuarios', usuariosRoutes);
app.use('/login', loginRoutes);
app.use('/logout', logoutRoutes);
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Bad JSON:', err.message);
    return res.status(400).json({ mensagem: 'JSON inválido', error: err.message });
  }
  next();
});
app.use((req, res, next) => {
  logUserConnection(req);
  next();
});

mongoose.connect("mongodb://localhost:27017/warning_db");
const db = mongoose.connection;

const promptPort = () => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('Digite a porta para o server: ', (port) => {
      rl.close();
      resolve(parseInt(port, 10) || 3000);
    });
  });
};

startServer = async () => {
  const port = await promptPort();
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server rodando na porta ${port}`);
  });
};

startServer();