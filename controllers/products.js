const express = require('express');

const ProductModel = require('../models/productModel');
const { productAccessMiddleware, authorizationValidMiddleware } = require('../middlewares/productAccessValid');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const products = await new ProductModel().getAll();

  res.status(200).json(products);
});

router.get('/:id', async (req, res) => {
  const product = await new ProductModel().getById(req.params.id);

  res.status(200).json(product);
});

// router.use(authorizationValidMiddleware);
router.use(productAccessMiddleware);

router.post('/', async (req, res) => {
  const { name, description, price } = req.body;

  const newProduct = new ProductModel(name, description, price);
  await newProduct.add();

  res.status(201).json(newProduct);
});

router.delete('/:id', async (req, res) => {
  await new ProductModel().delete(req.params.id);

  res.status(204).end();
});

router.put('/:id', async (req, res) => {
  const { name, description, price } = req.body;

  const products = new ProductModel(name, description, price);
  await products.addOrUpdate(req.params.id);

  res.status(200).json(products);
});

module.exports = router;
