const mongoose = require('mongoose');

const ArquivadosModel = new mongoose.Schema(
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


module.exports = mongoose.model('Arquivados', ArquivadosModel);