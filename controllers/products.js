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

router.put('/', async (req, res) => {
  if (!validate(req.body)) {
    return res.status(422).json({ message: 'Dados inválidos!' });
  }
  if (req.user.role !== 'funcionario') {
    return res.status(401).send({ message: "Unauthorized"});
  }
  await Product.addProduct(req.body);
  res.status(200).json({ message: 'Produto adicionado com sucessso!' });
});

module.exports = router;
