require('dotenv').config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const axios = require('axios');
const app = express();

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

const usuariosRoutes = require('./routes/usuarios');
const loginRoutes = require('./routes/login');
const logoutRoutes = require('./routes/logout');

app.use(express.json());
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

mongoose.connect("mongodb://localhost:27017/warning_db");
const db = mongoose.connection;

getIp = async () => {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    return response.data.ip;
  } catch (err) {
    console.error('Não foi possível determinar o IP local', err);
    return 'localhost';
  }
};

startServer = async () => {
  const serverIp = await getIp();
  app.listen(3000, '0.0.0.0', () => {
    console.log(`Server rodando no ip ${serverIp}:3000`);
  });
};

// run the server
startServer();