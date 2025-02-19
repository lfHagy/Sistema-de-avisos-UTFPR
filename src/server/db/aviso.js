const mongoose = require('mongoose');

const AvisoSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  descricao: { type: String, required: true, minlength: 1, maxlength: 500 },
  idCategoria: { type: Number, required: true }
});

AvisoSchema.pre('save', async function (next) {
  if (!this.id) {
    let newId;
    let exists = true;

    while (exists) {
      newId = Math.floor(1000 + Math.random() * 9000);
      exists = await mongoose.model('Aviso').exists({ id: newId });
    }

    this.id = newId;
  }
  next();
});

const Aviso = mongoose.model('Aviso', AvisoSchema);
module.exports = Aviso;
