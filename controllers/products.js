const express = require('express');

const { getAll, getById, deleteProduct, addProduct, updateProduct } = require('../models/productModel');
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

router.delete('/:id', async (req, res) => {
  const actionDelete = await deleteProduct(req.params.id);

  if (actionDelete)
    return res.status(400).json({ message: actionDelete });

  res.status(204).end();
});

router.use(productAccessMiddleware);

router.post('/', async (req, res) => {
  const newProduct = await addProduct(req.body)

  res.status(201).json(newProduct);
});

router.put('/:id', async (req, res) => {
  const updateProducts = await updateProduct(req.params.id, req.body);

  if (updateProducts === 'Id invalid')
    return res.status(400).json({ message: updateProducts });

  res.status(200).json(updateProducts);
});

module.exports = router;
