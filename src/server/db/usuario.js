const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UsuarioSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  nome: { type: String, required: true },
});

UsuarioSchema.pre('save', async function(next) {
  if (this.isModified('senha')) {
    this.senha = await bcrypt.hash(this.senha, 10);
  }
  next();
});

UsuarioSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.senha);
};

const Usuario = mongoose.model('Usuario', UsuarioSchema);
module.exports = Usuario;
