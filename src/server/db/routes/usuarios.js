const express = require('express');
const Usuario = require('../usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;
const router = express.Router();

//login
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ mensagem: 'Email e/ou senha invalidos' });
    }

    const loginMatches = await bcrypt.compare(senha, usuario.senha);
    if (!loginMatches) {
      return res.status(401).json({ mensagem: 'Email e/ou senha invalidos' });
    }

    const token = jwt.sign(
      { email: usuario.email, nome: usuario.nome },
      secretKey,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ mensagem: 'Erro no servidor', error: err.message });
  }
});


router.post('/logout', (req, res) => {
  res.status(200).send();
});
router.post('/', async (req, res) => {
  const { email, senha, nome } = req.body;

  if (!email || !senha || !nome) {
    return res.status(400).json({ mensagem: 'Dados invalidos' });
  }

  try {
    const userAlreadyExists = await Usuario.findOne({ email });
    if (userAlreadyExists) {
      return res.status(409).json({ mensagem: 'Email ja cadastrado' });
    }

    const newUser = new Usuario({ email, senha, nome });
    await newUser.save();
    res.status(201).end();
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro no servidor', error: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.find({}, { __v: 0 });
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro no servidor', error: err.message });
  }
});

router.get('/:email', async (req, res) => {
  try {
    const usuario = await Usuario.findOne({ email: req.params.email });
    if (!usuario) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }
    res.json(usuario);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro no servidor', error: err.message });
  }
});

router.put('/:email', async (req, res) => {
  const { nome, senha } = req.body;

  if (!nome || !senha) {
    return res.status(400).json({ mensagem: 'Dados invalidos' });
  }

  try {
    const updatedUser = await Usuario.findOneAndUpdate(
      { email: req.params.email },
      { name: nome, password: senha },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }

    res.json({ nome: updatedUser.name, senha: updatedUser.password });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro no servidor', error: err.message });
  }
});

router.delete('/:email', async (req, res) => {
  try {
    const deletedUser = await Usuario.findOneAndDelete({ email: req.params.email });
    if (!deletedUser) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }
    res.status(200).end();
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro no servidor', error: err.message });
  }
});

module.exports = router;
