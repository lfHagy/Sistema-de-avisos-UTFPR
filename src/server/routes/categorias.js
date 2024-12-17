const express = require('express');
const Categoria = require('../db/categoria');
const { authenticateToken, authenticateAdmin } = require('../middleware/authenticateToken');
const router = express.Router();

const validateName = (nome) => nome && nome.length >= 1 && nome.length <= 150;

router.post('/', authenticateToken, authenticateAdmin, async (req, res) => {
  const { nome } = req.body;

  if (!validateName(nome)) {
    return res.status(400).json({ mensagem: 'Dados invalidos' });
  }

  try {
    const newCategoria = new Categoria({ nome });
    const savedCategoria = await newCategoria.save();
    res.status(201).end();
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro no servidor', error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const categorias = await Categoria.find({}, { _id: 0, __v: 0 });
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro no servidor', error: err.message });
  }
});

router.put('/:id', authenticateToken, authenticateAdmin, async (req, res) => {
  const { nome } = req.body;
  const { id } = req.params;

  if (!validateName(nome)) {
    return res.status(400).json({ mensagem: 'Dados invalidos' });
  }

  try {
    const updatedCategoria = await Categoria.findOneAndUpdate(
      { id },
      { nome },
      { new: true, runValidators: true, projection: { _id: 0, __v: 0 } }
    );

    if (!updatedCategoria) {
      return res.status(404).json({ mensagem: 'Categoria nao encontrada' });
    }

    res.json({ nome: updatedCategoria.nome });
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro no servidor', error: err.message });
  }
});

router.delete('/:id', authenticateToken, authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategoria = await Categoria.findOneAndDelete({ id });

    if (!deletedCategoria) {
      return res.status(404).json({ mensagem: 'Categoria nao encontrada' });
    }

    res.status(200).end();
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro no servidor', error: err.message });
  }
});

module.exports = router;
