const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: true // Remove espaços em branco no início e no final
    },
    quantidade: {
        type: Number,
        required: true,
        min: 0 // Garante que a quantidade não seja negativa
    },
    valor: {
        type: Number,
        required: true,
        min: 0
    },
    armazem_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'armazens',
        required: true
    }
});

produtoSchema.statics.findByArmazem = function (armazemId) {
    return this.find({ armazem_id: armazemId });
};

const Produto = mongoose.model('Produto', produtoSchema);

module.exports = Produto;
