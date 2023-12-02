const Armazem = require('../models/armazemModel');

// Obtém a quantidade total de armazéns
const qtdeArmazens = async (req, res) => {
    try {
        const totalArmazens = await Armazem.countDocuments();
        res.json({ totalArmazens });
    } catch (error) {
        console.error('Erro ao contar os armazéns:', error);
        res.status(500).json({ error: 'Erro ao contar os armazéns' });
    }
};

// Obtém todos os armazéns, incluindo informações do responsável
const getArmazens = async (req, res) => {
    try {
        const armazens = await Armazem.find().populate('responsavel').exec();
        res.json(armazens);
    } catch (error) {
        console.error('Erro ao obter os armazéns:', error);
        res.status(500).json({ error: 'Erro ao obter os armazéns' });
    }
};

// Cria um novo armazém
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

// Atualiza um armazém existente
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

// Exclui um armazém existente
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
