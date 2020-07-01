const express = require('express');
const rescue = require('../rescue/index');
const Product = require('../models/products');
const { productAccess, authorizationValid } = require('../middlewares/productsValid');

const router = express.Router();

router.get('/', async (_req, res) => {
  const products = await Product.allProducts();

  res.status(200).json(products);
});

router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);

  res.status(200).json(product);
});

router.use(rescue(authorizationValid));

router.delete('/:id', async (req, res) => {
  const isDelete = await Product.deleteProduct(req.params.id);

  if (isDelete)
    return res.status(400).json({ message: isDelete });

  res.status(204).end();
});

router.use(productAccess);

router.post('/', async (req, res) => {
  const newProduct = await Product.addProduct(req.body);

  res.status(201).json(newProduct);
});

router.put('/:id', async (req, res) => {
  const updateProducts = await Product.updateProduct(req.body, req.params.id);

  if (updateProducts === 'Id invalid')
    return res.status(400).json({ message: updateProducts });

  res.status(200).json(updateProducts);
});

module.exports = router;
