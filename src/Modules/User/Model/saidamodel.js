const mongoose = require('mongoose');

const SaidaModel = new mongoose.Schema(
    {
        titulo: { type: String }
    },

    {
        timestamps: {
            updatedAt: true,
            createdAt: true,
        },
    },
);


module.exports = mongoose.model('Saida', SaidaModel);