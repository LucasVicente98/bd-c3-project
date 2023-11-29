const mongoose = require('mongoose');

const responsavelSchema = new mongoose.Schema({
    nome: String,
    telefone: String
});

const Responsavel = mongoose.model('Responsavel', responsavelSchema);

module.exports = Responsavel;
