const express = require('express');

const { v4: uuid4 } = require('uuid');

const router = express.Router();

const { validProductMiddleware } = require('../middlewares/products');

const { readFileJson, writeFileJson } = require('../fs-functions');

router.get('/', async (_req, res) => {
  const readProducts = await readFileJson('products');

  res.status(200).json(readProducts);
});

router.post('/', validProductMiddleware, async (req, res) => {
  const newProduct = await readFileJson('products');
  const product = { id: uuid4(), ...req.body };
  newProduct.push(product);

  await writeFileJson(newProduct, 'products');

  res.status(200).json({ message: 'Product successfully registered' });
});

module.exports = router;
