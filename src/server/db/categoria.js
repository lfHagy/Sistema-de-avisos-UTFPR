const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const CategoriaSchema = new mongoose.Schema({
  nome: { type: String, required: true, minlength: 1, maxlength: 150 },
  id: { type: Number, unique: true }
});

CategoriaSchema.plugin(AutoIncrement, { inc_field: 'id' });

const Categoria = mongoose.model('Categoria', CategoriaSchema);

module.exports = Categoria;