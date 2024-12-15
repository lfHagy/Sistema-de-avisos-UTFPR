const express = require('express');
const Categoria = require('../db/categoria');
const { authenticateToken, authenticateAdmin } = require('../middleware/authenticateToken');
const router = express.Router();

router.post('/', authenticateToken, authenticateAdmin, async (req, res) => {
  const { nome } = req.body;

  if (!nome || nome.length < 1 || nome.length > 150) {
    return res.status(400).json({ mensagem: 'Dados invalidos' });
  }

  try {
    const newCategoria = new Categoria({ nome });
    await newCategoria.save();
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

  if (!nome || nome.length < 1 || nome.length > 150) {
    return res.status(400).json({ mensagem: 'Dados invalidos' });
  }

  try {
    const updatedCategoria = await Categoria.findByIdAndUpdate(
      req.params.id,
      { nome },
      { new: true, runValidators: true }
    );

    if (!updatedCategoria) {
      return res.status(404).json({ mensagem: 'Categoria nao encontrada' });
    }

    res.json(updatedCategoria);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro no servidor', error: err.message });
  }
});

router.delete('/:id', authenticateToken, authenticateAdmin, async (req, res) => {
  try {
    const deletedCategoria = await Categoria.findByIdAndDelete(req.params.id);

    if (!deletedCategoria) {
      return res.status(404).json({ mensagem: 'Categoria nao encontrada' });
    }

    res.status(200).end();
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro no servidor', error: err.message });
  }
});

module.exports = router;