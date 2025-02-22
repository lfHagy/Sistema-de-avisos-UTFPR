require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const readline = require("readline");
const usuariosRoutes = require("./routes/usuarios");
const { router: loginRoutes, activeUsers } = require("./routes/login");
const logoutRoutes = require("./routes/logout");
const categoriasRoutes = require("./routes/categorias.js");
const avisosRoutes = require("./routes/avisos.js");
const jsonVerifier = require("./middleware/jsonVerifier.js");

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use((req, res, next) => {
  const startTime = new Date().toISOString();
  console.log(`${startTime}: Received - ${req.method} ${req.originalUrl}`);
  console.log('Body: ', req.body);

  res.on("finish", () => {
    console.log(`${startTime}: Responded with ${res.statusCode}`);
  });

  next();
});

app.use("/usuarios", usuariosRoutes);
app.use("/login", loginRoutes);
app.use("/logout", logoutRoutes);
app.use("/categorias", categoriasRoutes);
app.use("/avisos", avisosRoutes);
app.use(jsonVerifier);

mongoose.connect("mongodb://localhost:27017/warning_db");
const db = mongoose.connection;

const promptPort = () => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("Digite a porta para o server: ", (port) => {
      rl.close();
      resolve(parseInt(port, 10) || 3000);
    });
  });
};

function printActiveUsers() {
  setInterval(() => {
    console.log("Usuários conectados:", activeUsers.map(user => user.email));
  }, 10000);
}

startServer = async () => {
  const port = await promptPort();

  app.listen(port, "0.0.0.0", () => {
    console.log(`Server rodando na porta ${port}`);
  });

  printActiveUsers();
};

startServer();
