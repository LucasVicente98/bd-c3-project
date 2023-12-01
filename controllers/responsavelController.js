const Responsavel = require('../models/responsavelModel');
const Armazem = require('../models/armazemModel');

const qtdeResponsaveis = async (req, res) => {
    try {
        const totalResponsaveis = await Responsavel.countDocuments();
        res.json({ totalResponsaveis });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao contar os responsáveis' });
    }
};

const getResponsaveis = async (req, res) => {
    const responsaveis = await Responsavel.find().exec();
    res.json(responsaveis);
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
                    from: 'responsaveis', // Nome da coleção no MongoDB
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

        console.log(resultado); // Adiciona este log para visualizar o resultado no console
        res.json(resultado);
    } catch (error) {
        console.error(error); // Adiciona este log para visualizar o erro no console
        res.status(500).json({ error: 'Erro ao calcular total de armazéns por responsável' });
    }
};

const postResponsavel = async (req, res) => {
    const newResponsavel = req.body;
    const result = await Responsavel.create(newResponsavel);
    res.json(result);
};

const putResponsavel = async (req, res) => {
    const responsavelId = req.params.id;
    const updatedResponsavel = req.body;

    const result = await Responsavel.findByIdAndUpdate(responsavelId, { $set: updatedResponsavel }, { new: true });
    res.json(result);
};

const deleteResponsavel = async (req, res) => {
    const responsavelId = req.params.id;

    const result = await Responsavel.findByIdAndDelete(responsavelId);
    res.json(result);
};

module.exports = { qtdeResponsaveis, getResponsaveis, getTotalArmazensPorResponsavel, postResponsavel, putResponsavel, deleteResponsavel };
