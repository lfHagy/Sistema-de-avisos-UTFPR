require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const axios = require('axios');
const app = express();

const usuariosRoutes = require('./db/routes/usuarios');

app.use(express.json());
app.use('/usuarios', usuariosRoutes);
// middleware
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Bad JSON:', err.message);
    return res.status(400).json({ mensagem: 'JSON inválido', error: err.message });
  }
  next(); // Passes to the next middleware if no error
});
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

mongoose.connect("mongodb://localhost:27017/warning_db");
const db = mongoose.connection;

getIp = async () => {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    return response.data.ip;
  } catch (err) {
    console.error('Could not fetch public IP', err);
    return 'localhost';
  }
};

startServer = async () => {
  const serverIp = await getIp();
  app.listen(3000, '0.0.0.0', () => {
    console.log(`Server running at http://${serverIp}:3000`);
  });
};

// run the server
startServer();