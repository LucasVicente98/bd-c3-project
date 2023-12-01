const Produto = require('../models/produtoModel');

const qtdeProdutos = async (req, res) => {
    try {
        const totalProdutos = await Produto.countDocuments();
        res.json({ totalProdutos });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao contar produtos' });
    }
};

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
        res.status(500).json({ error: 'Erro ao calcular valor total' });
    }
};

const valorTotalProdutosPorArmazem = async (req, res) => {
    try {
        const resultado = await Produto.aggregate([
            {
                $match: {
                    armazem_id: { $ne: null }
                }
            },
            {
                $group: {
                    _id: '$armazem_id',
                    valorTotal: { $sum: { $multiply: ['$quantidade', '$valor'] } }
                }
            }
        ]);

        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao calcular valor total por armazém' });
    }
};

const mediaPrecoProdutosPorArmazem = async (req, res) => {
    try {
        const resultado = await Produto.aggregate([
            {
                $match: {
                    armazem_id: { $ne: null }
                }
            },
            {
                $group: {
                    _id: '$armazem_id',
                    mediaPreco: { $avg: '$valor' }
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
            {
                $unwind: '$armazem'
            },
            {
                $project: {
                    armazem: '$armazem.nome',
                    mediaPreco: 1
                }
            }
        ]);

        console.log('Resultado:', resultado); // Adicione esta linha para verificar o resultado no console

        res.json(resultado);
    } catch (error) {
        console.error('Erro:', error); // Adicione esta linha para verificar o erro no console
        res.status(500).json({ error: 'Erro ao calcular média de preço dos produtos por armazém' });
    }
};

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

module.exports = { qtdeProdutos, valorTotalProdutosPorArmazem, mediaPrecoProdutosPorArmazem, valorTotalProdutos, getProdutos, postProduto, putProduto, deleteProduto };
