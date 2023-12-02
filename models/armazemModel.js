const mongoose = require('mongoose');

const armazemSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: true // Remove espaços em branco no início e no final
    },
    localizacao: {
        type: String,
        required: true,
        trim: true
    },
    capacidade: {
        type: Number,
        required: true,
        min: 0 // Garante que a capacidade não seja negativa
    },
    responsavel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'responsaveis',
        required: true
    }
});

armazemSchema.statics.findByResponsavel = function (responsavelId) {
    return this.find({ responsavel: responsavelId });
};

const Armazem = mongoose.model('armazens', armazemSchema);

module.exports = Armazem;
