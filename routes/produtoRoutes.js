const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

router.get('/media-preco-por-armazem', produtoController.mediaPrecoProdutosPorArmazem);
router.get('/vlr-total-produtos-por-armazem', produtoController.valorTotalProdutosPorArmazem);
router.get('/qtde-produtos', produtoController.qtdeProdutos);
router.get('/vlr-total-produtos', produtoController.valorTotalProdutos);
router.get('/', produtoController.getProdutos);
router.post('/', produtoController.postProduto);
router.put('/:id', produtoController.putProduto);
router.delete('/:id', produtoController.deleteProduto);

module.exports = router;
