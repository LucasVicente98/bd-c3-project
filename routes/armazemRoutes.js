const express = require('express');
const router = express.Router();
const armazemController = require('../controllers/armazemController');

// Middleware para tratamento global de erros
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Erro interno no servidor');
});

router.get('/qtde-armazens', armazemController.qtdeArmazens);
router.get('/', armazemController.getArmazens);
router.post('/', armazemController.postArmazem);
router.put('/:id', armazemController.putArmazem);
router.delete('/:id', armazemController.deleteArmazem);

module.exports = router;
