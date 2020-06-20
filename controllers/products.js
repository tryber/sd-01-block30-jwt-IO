const express = require('express');

const router = express.Router();

const productMiddleware = require('../middlewares/products');

const producsModel = require('../models/productsModel');

router.get('/', async (_req, res) => {
  const readProducts = await producsModel.getAllProducts();

  res.status(200).json(readProducts);
});

router.use(productMiddleware.authorizationValidMiddleware);

router.post('/', productMiddleware.validProductMiddleware, async (req, res) => {
  await producsModel.addProduct(req.body);

  res.status(200).json({ message: 'Product successfully registered' });
});

router.delete('/:id', async (req, res) => {
  const actionDelete = await producsModel.deleteProduct(req.params.id);

  if (actionDelete)
    return res.status(400).json({ message: actionDelete });

  res.status(204).end();
});

module.exports = router;
