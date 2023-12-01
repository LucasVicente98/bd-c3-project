const express = require('express');
const router = express.Router();
const responsavelController = require('../controllers/responsavelController');

router.get('/qtde-responsaveis', responsavelController.qtdeResponsaveis);
router.get('/total-armazens', responsavelController.getTotalArmazensPorResponsavel);
router.get('/', responsavelController.getResponsaveis);
router.post('/', responsavelController.postResponsavel);
router.put('/:id', responsavelController.putResponsavel);
router.delete('/:id', responsavelController.deleteResponsavel);

module.exports = router;
