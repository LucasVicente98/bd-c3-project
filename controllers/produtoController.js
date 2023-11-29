const Produto = require('../models/produtoModel');

const getProdutos = async (req, res) => {
    const produtos = await Produto.find().populate('armazem_id').exec();
    res.json(produtos);
};

const postProduto = async (req, res) => {
    const newProduto = req.body;
    const result = await Produto.create(newProduto);
    res.json(result);
};

const putProduto = async (req, res) => {
    const produtoId = req.params.id;
    const updatedProduto = req.body;

    const result = await Produto.findByIdAndUpdate(produtoId, { $set: updatedProduto }, { new: true });
    res.json(result);
};

const deleteProduto = async (req, res) => {
    const produtoId = req.params.id;

    const result = await Produto.findByIdAndDelete(produtoId);
    res.json(result);
};

module.exports = { getProdutos, postProduto, putProduto, deleteProduto };
