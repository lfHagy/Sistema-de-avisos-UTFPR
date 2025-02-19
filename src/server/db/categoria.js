const mongoose = require('mongoose');

const CategoriaSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  nome: { type: String, required: true, minlength: 1, maxlength: 150 }
});

CategoriaSchema.pre('save', async function (next) {
  if (!this.id) {
    let newId;
    let exists = true;

    while (exists) {
      newId = Math.floor(1000 + Math.random() * 9000);
      exists = await mongoose.model('Categoria').exists({ id: newId });
    }

    this.id = newId;
  }
  next();
});

const Categoria = mongoose.model('Categoria', CategoriaSchema);
module.exports = Categoria;
