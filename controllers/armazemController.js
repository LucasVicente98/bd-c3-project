const Armazem = require('../models/armazemModel');

const qtdeArmazens = async (req, res) => {
    try {
        const totalArmazens = await Armazem.countDocuments();
        res.json({ totalArmazens });
    } catch (error) {
        console.error('Erro ao contar os armazéns:', error);
        res.status(500).json({ error: 'Erro ao contar os armazéns' });
    }
};

const getArmazens = async (req, res) => {
    try {
        const armazens = await Armazem.find().populate('responsavel').exec();
        res.json(armazens);
    } catch (error) {
        console.error('Erro ao obter os armazéns:', error);
        res.status(500).json({ error: 'Erro ao obter os armazéns' });
    }
};

const postArmazem = async (req, res) => {
    try {
        const newArmazem = req.body;
        const result = await Armazem.create(newArmazem);
        res.json(result);
    } catch (error) {
        console.error('Erro ao criar um novo armazém:', error);
        res.status(500).json({ error: 'Erro ao criar um novo armazém' });
    }
};

const putArmazem = async (req, res) => {
    try {
        const armazemId = req.params.id;
        const updatedArmazem = req.body;

        const result = await Armazem.findByIdAndUpdate(armazemId, { $set: updatedArmazem }, { new: true });
        res.json(result);
    } catch (error) {
        console.error('Erro ao atualizar o armazém:', error);
        res.status(500).json({ error: 'Erro ao atualizar o armazém' });
    }
};

const deleteArmazem = async (req, res) => {
    try {
        const armazemId = req.params.id;

        const result = await Armazem.findByIdAndDelete(armazemId);
        res.json(result);
    } catch (error) {
        console.error('Erro ao excluir o armazém:', error);
        res.status(500).json({ error: 'Erro ao excluir o armazém' });
    }
};

module.exports = {
    qtdeArmazens,
    getArmazens,
    postArmazem,
    putArmazem,
    deleteArmazem
};
