const express = require('express');
const router = express.Router();
const armazemController = require('../controllers/armazemController');

router.get('/', armazemController.getArmazens);
router.post('/', armazemController.postArmazem);
router.put('/:id', armazemController.putArmazem);
router.delete('/:id', armazemController.deleteArmazem);

module.exports = router;
