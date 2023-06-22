const mongoose = require('mongoose');

const ProcuradorSchema = new mongoose.Schema(
  {
    cpf: {
      type: String,
      required: false,
      unique: true,
    },
    telefone: [
        {
            type: String,
        }
    ]
  },
  {
    timestamps: {
      updatedAt: true,
      createdAt: true,
    },
  },
);

module.exports = mongoose.model('Procurador', ProcuradorSchema);