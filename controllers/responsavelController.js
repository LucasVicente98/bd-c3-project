const Responsavel = require('../models/responsavelModel');
const Armazem = require('../models/armazemModel');

const handleError = (res, message, error) => {
    console.error(`Erro: ${message}`, error);
    res.status(500).json({ error: message });
};

const qtdeResponsaveis = async (req, res) => {
    try {
        const totalResponsaveis = await Responsavel.countDocuments();
        res.json({ totalResponsaveis });
    } catch (error) {
        handleError(res, 'Erro ao contar responsáveis', error);
    }
};

const getResponsaveis = async (req, res) => {
    try {
        const responsaveis = await Responsavel.find().exec();
        res.json(responsaveis);
    } catch (error) {
        handleError(res, 'Erro ao obter responsáveis', error);
    }
};

const getTotalArmazensPorResponsavel = async (req, res) => {
    try {
        const resultado = await Armazem.aggregate([
            {
                $group: {
                    _id: '$responsavel',
                    totalArmazens: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: 'responsaveis',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'responsavel'
                }
            },
            {
                $unwind: '$responsavel'
            },
            {
                $project: {
                    responsavel: '$responsavel.nome',
                    totalArmazens: 1
                }
            }
        ]);

        res.json(resultado);
    } catch (error) {
        handleError(res, 'Erro ao calcular total de armazéns por responsável', error);
    }
};

const postResponsavel = async (req, res) => {
    try {
        const newResponsavel = req.body;
        const result = await Responsavel.create(newResponsavel);
        res.json(result);
    } catch (error) {
        handleError(res, 'Erro ao criar um novo responsável', error);
    }
};

const putResponsavel = async (req, res) => {
    try {
        const responsavelId = req.params.id;
        const updatedResponsavel = req.body;

        const result = await Responsavel.findByIdAndUpdate(responsavelId, { $set: updatedResponsavel }, { new: true });
        res.json(result);
    } catch (error) {
        handleError(res, 'Erro ao atualizar responsável', error);
    }
};

const deleteResponsavel = async (req, res) => {
    try {
        const responsavelId = req.params.id;

        const result = await Responsavel.findByIdAndDelete(responsavelId);
        res.json(result);
    } catch (error) {
        handleError(res, 'Erro ao excluir responsável', error);
    }
};

module.exports = {
    qtdeResponsaveis,
    getResponsaveis,
    getTotalArmazensPorResponsavel,
    postResponsavel,
    putResponsavel,
    deleteResponsavel
};
