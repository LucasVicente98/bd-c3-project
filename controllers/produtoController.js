const Produto = require('../models/produtoModel');

// Função para lidar com erros de forma padronizada
const handleError = (res, message, error) => {
    console.error(`Erro: ${message}`, error);
    res.status(500).json({ error: message });
};

// Obtém a quantidade total de produtos na coleção
const qtdeProdutos = async (req, res) => {
    try {
        const totalProdutos = await Produto.countDocuments();
        res.json({ totalProdutos });
    } catch (error) {
        handleError(res, 'Erro ao contar produtos', error);
    }
};

// Calcula o valor total de todos os produtos
const valorTotalProdutos = async (req, res) => {
    try {
        const resultado = await Produto.aggregate([
            {
                $group: {
                    _id: null,
                    valorTotal: { $sum: { $multiply: ['$quantidade', '$valor'] } }
                }
            }
        ]);

        const valorTotal = resultado.length > 0 ? resultado[0].valorTotal : 0;
        res.json({ valorTotal });
    } catch (error) {
        handleError(res, 'Erro ao calcular valor total', error);
    }
};

// Calcula o valor total de produtos por armazém
const valorTotalProdutosPorArmazem = async (req, res) => {
    try {
        const resultado = await Produto.aggregate([
            { $match: { armazem_id: { $ne: null } } },
            {
                $group: {
                    _id: '$armazem_id',
                    valorTotal: { $sum: { $multiply: ['$quantidade', '$valor'] } }
                }
            },
            {
                $lookup: {
                    from: 'armazens',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'armazem'
                }
            },
            { $unwind: '$armazem' },
            {
                $project: {
                    _id: 1,
                    valorTotal: 1,
                    'armazem.nome': 1
                }
            }
        ]);

        res.json(resultado);
    } catch (error) {
        handleError(res, 'Erro ao calcular valor total por armazém', error);
    }
};

// Calcula a média de preço de produtos por armazém
const mediaPrecoProdutosPorArmazem = async (req, res) => {
    try {
        const resultado = await Produto.aggregate([
            {
                $lookup: {
                    from: 'armazens',
                    localField: 'armazem_id',
                    foreignField: '_id',
                    as: 'armazem'
                }
            },
            { $unwind: '$armazem' },
            {
                $group: {
                    _id: '$armazem._id',
                    mediaPreco: { $avg: '$valor' },
                    armazem: { $first: '$armazem' }
                }
            },
            {
                $project: {
                    armazem_id: '$_id',
                    mediaPreco: 1,
                    'armazem._id': 1,
                    'armazem.nome': 1,
                    _id: 0
                }
            }
        ]);

        res.json(resultado);
    } catch (error) {
        handleError(res, 'Erro ao calcular média de preço por armazém', error);
    }
};

// Obtém todos os produtos, incluindo informações do armazém associado
const getProdutos = async (req, res) => {
    try {
        const produtos = await Produto.find().populate('armazem_id').exec();
        res.json(produtos);
    } catch (error) {
        handleError(res, 'Erro ao obter produtos', error);
    }
};

// Cria um novo produto
const postProduto = async (req, res) => {
    try {
        const newProduto = req.body;
        const result = await Produto.create(newProduto);
        res.json(result);
    } catch (error) {
        handleError(res, 'Erro ao criar um novo produto', error);
    }
};

// Atualiza um produto existente
const putProduto = async (req, res) => {
    try {
        const produtoId = req.params.id;
        const updatedProduto = req.body;
        const result = await Produto.findByIdAndUpdate(produtoId, { $set: updatedProduto }, { new: true });
        res.json(result);
    } catch (error) {
        handleError(res, 'Erro ao atualizar produto', error);
    }
};

// Exclui um produto existente
const deleteProduto = async (req, res) => {
    try {
        const produtoId = req.params.id;
        const result = await Produto.findByIdAndDelete(produtoId);
        res.json(result);
    } catch (error) {
        handleError(res, 'Erro ao excluir produto', error);
    }
};

module.exports = {
    qtdeProdutos,
    valorTotalProdutosPorArmazem,
    mediaPrecoProdutosPorArmazem,
    valorTotalProdutos,
    getProdutos,
    postProduto,
    putProduto,
    deleteProduto
};
