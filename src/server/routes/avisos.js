const express = require('express');
const Aviso = require('../db/aviso');
const Categoria = require('../db/categoria');
const { authenticateToken, authenticateAdmin } = require('../middleware/authenticateToken');

const router = express.Router();

const validateDescricao = (descricao) => descricao && descricao.length >= 1 && descricao.length <= 500;

router.post('/', authenticateToken, authenticateAdmin, async (req, res) => {
  const { idCategoria, descricao } = req.body;

  if (!validateDescricao(descricao)) {
    return res.status(400).json({ mensagem: 'Dados invalidos' });
  }

  try {
    const categoriaExists = await Categoria.exists({ id: idCategoria });
    if (!categoriaExists) {
      return res.status(400).json({ mensagem: 'Categoria nao encontrada' });
    }

    const newAviso = new Aviso({ idCategoria, descricao });
    await newAviso.save();
    res.status(201).end();
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro no servidor', error: err.message });
  }
});

router.get('/:idCategoria', authenticateToken, async (req, res) => {
  const { idCategoria } = req.params;

  if (!Number.isInteger(Number(idCategoria))) {
    return res.status(400).json({ mensagem: 'Dados invalidos' });
  }

  try {
    const avisos = await Aviso.find({ idCategoria: Number(idCategoria) }, { _id: 0, __v: 0 });
    res.json(avisos);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro no servidor', error: err.message });
  }
});

router.put('/:id', authenticateToken, authenticateAdmin, async (req, res) => {
  const { descricao } = req.body;
  const { id } = req.params;

  if (!validateDescricao(descricao)) {
    return res.status(400).json({ mensagem: 'Dados invalidos' });
  }

  try {
    const updatedAviso = await Aviso.findOneAndUpdate(
      { id: Number(id) },
      { descricao },
      { new: true, runValidators: true }
    );

    if (!updatedAviso) {
      return res.status(404).json({ mensagem: 'Aviso nao encontrado' });
    }

    res.status(200).end();
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro no servidor', error: err.message });
  }
});

// DELETE /avisos/:id (Delete an aviso)
router.delete('/:id', authenticateToken, authenticateAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAviso = await Aviso.findOneAndDelete({ id: Number(id) });

    if (!deletedAviso) {
      return res.status(404).json({ mensagem: 'Aviso nao encontrado' });
    }

    res.status(200).end();
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro no servidor', error: err.message });
  }
});

module.exports = router;
