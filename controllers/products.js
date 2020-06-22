const express = require('express');

const router = express.Router();

const productMiddleware = require('../middlewares/products');

const producsModel = require('../models/productsModel');

router.get('/', async (_req, res) => {
  const readProducts = await producsModel.getAllProducts();

  res.status(200).json(readProducts);
});

router.get('/:id', async (req, res) => {
  const product = await producsModel.getById(req.params.id);

  res.status(200).json(product);
});

router.use(productMiddleware.authorizationValidMiddleware);

router.post('/', productMiddleware.validProductMiddleware, async (req, res) => {
  await producsModel.addProduct(req.body);

  res.status(200).json({ message: 'Product successfully registered' });
});

router.put('/:id', productMiddleware.validProductMiddleware, async (req, res) => {
  const updateProducts = await producsModel.updateProduct(req.params.id, req.body);

  if (updateProducts === 'Id invalid')
    return res.status(400).json({ message: updateProducts });

  res.status(200).json(updateProducts);
});

router.delete('/:id', async (req, res) => {
  const productDelete = await producsModel.deleteProduct(req.params.id);

  if (productDelete) return res.status(400).json({ message: productDelete });

  res.status(204).end();
});

module.exports = router;
