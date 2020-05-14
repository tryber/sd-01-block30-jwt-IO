const express = require('express');
const router = express.Router();
const Product = require('../models/product');

const {
  products: { validate },
} = require('../validation');

router.get('/', async (req, res) => {
  const productList = await Product.allProducts();
  res.json(productList);
});

router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

router.post('/', async (req, res) => {
  if (!validate(req.body)) {
    return res.status(422).json({ message: 'Dados inválidos!' });
  }
  if (req.user.role !== 'funcionario') {
    return res.status(401).send({ message: 'Unauthorized' });
  }
  await Product.addProduct(req.body);
  res.status(201).json({ message: 'Produto adicionado com sucessso!' });
});

router.put('/:id', async (req, res) => {
  if (req.user.role !== 'funcionario') {
    return res.status(401).send({ message: 'Unauthorized' });
  }
  if (!validate(req.body)) {
    return res.status(422).json({ message: 'Dados inválidos!' });
  }
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(422).send({ message: 'Produto não encontrado' });
  }
  await Product.updateProduct(req.body, req.params.id);
  res.status(200).json({ message: 'Produto atualizado com sucessso!' });
});

router.delete('/:id', async (req, res) => {
  if (req.user.role !== 'funcionario') {
    return res.status(401).send({ message: 'Unauthorized' });
  }
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(422).send({ message: 'Produto não encontrado' });
  }
  await Product.deleteProduct(req.params.id);
  res.status(200).json({ message: 'Produto deletado com sucessso!' });
});

module.exports = router;
