const mongoose = require('mongoose');

const armazemSchema = new mongoose.Schema({
    nome: String,
    localizacao: String,
    capacidade: Number,
    responsavel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Responsavel'
    }
});

const Armazem = mongoose.model('Armazem', armazemSchema);

module.exports = Armazem;
