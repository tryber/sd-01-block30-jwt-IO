const express = require('express');

const { Product, getAll, getById, deleteProduct } = require('../models/productModel');
const { productAccessMiddleware, authorizationValidMiddleware } = require('../middlewares/productAccessValid');

const router = express.Router();

router.get('/', async (req, res) => {
  const products = await getAll();

  res.status(200).json(products);
});

router.get('/:id', async (req, res) => {
  const product = await getById(req.params.id);

  res.status(200).json(product);
});

router.use(authorizationValidMiddleware);
router.use(productAccessMiddleware);

router.post('/', async (req, res) => {
  const { name, description, price } = req.body;

  const newProduct = new Product(name, description, price);
  await newProduct.add();

  res.status(201).json(newProduct);
});

router.delete('/:id', async (req, res) => {
  await deleteProduct(req.params.id);

  res.status(204).end();
});

router.put('/:id', async (req, res) => {
  const { name, description, price } = req.body;

  const products = new Product(name, description, price)
  const updateProducts = await products.update(req.params.id);

  if (updateProducts === 'id invalid')
    return res.status(400).json({ message: updateProducts });

  res.status(200).json(products);
});

module.exports = router;
