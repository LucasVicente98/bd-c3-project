const Armazem = require('../models/armazemModel');

const qtdeArmazens = async (req, res) => {
    try {
        const totalArmazens = await Armazem.countDocuments();
        res.json({ totalArmazens });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao contar os armazéns' });
    }
};

const getArmazens = async (req, res) => {
    const armazens = await Armazem.find().populate('responsavel').exec();
    res.json(armazens);
};

const postArmazem = async (req, res) => {
    const newArmazem = req.body;
    const result = await Armazem.create(newArmazem);
    res.json(result);
};

const putArmazem = async (req, res) => {
    const armazemId = req.params.id;
    const updatedArmazem = req.body;

    const result = await Armazem.findByIdAndUpdate(armazemId, { $set: updatedArmazem }, { new: true });
    res.json(result);
};

const deleteArmazem = async (req, res) => {
    const armazemId = req.params.id;

    const result = await Armazem.findByIdAndDelete(armazemId);
    res.json(result);
};

module.exports = { qtdeArmazens, getArmazens, postArmazem, putArmazem, deleteArmazem };
