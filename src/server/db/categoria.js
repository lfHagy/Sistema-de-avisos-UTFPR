const mongoose = require('mongoose');

const CategoriaSchema = new mongoose.Schema({
  nome: { type: String, required: true, minlength: 1, maxlength: 150 },
});

const Categoria = mongoose.model('Categoria', CategoriaSchema);

module.exports = Categoria;