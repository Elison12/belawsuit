const mongoose = require('mongoose');

const EntradaModel = new mongoose.Schema(
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


module.exports = mongoose.model('Entrada', EntradaModel);