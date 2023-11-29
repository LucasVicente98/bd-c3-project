const Responsavel = require('../models/responsavelModel');

const getResponsaveis = async (req, res) => {
    const responsaveis = await Responsavel.find().exec();
    res.json(responsaveis);
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

module.exports = { getResponsaveis, postResponsavel, putResponsavel, deleteResponsavel };
