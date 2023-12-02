const mongoose = require('mongoose');

const responsavelSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: true // Remove espaços em branco no início e no final
    },
    telefone: {
        type: String,
        trim: true
    }
});

responsavelSchema.statics.findByNome = function (nome) {
    return this.findOne({ nome: nome });
};

const Responsavel = mongoose.model('responsaveis', responsavelSchema);

module.exports = Responsavel;
