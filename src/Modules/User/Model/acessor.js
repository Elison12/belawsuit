const mongoose = require('mongoose');

const AcessorSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true
        }
    },
    {
        timestamps: {
            updatedAt: true,
            createdAt: true,
        },
    },
);

module.exports = mongoose.model('Acessor', AcessorSchema);