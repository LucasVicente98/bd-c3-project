const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
    nome: String,
    quantidade: Number,
    data_validade: Date,
    armazem_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Armazem'
    }
});

const Produto = mongoose.model('Produto', produtoSchema);

module.exports = Produto;
