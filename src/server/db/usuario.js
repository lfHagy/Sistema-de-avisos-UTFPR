const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  nome: { type: String, required: true },
  admin: { type: Boolean, default: false}
});

UsuarioSchema.methods.comparePassword = function(password) {
  return password === this.senha;
};

const Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario;
