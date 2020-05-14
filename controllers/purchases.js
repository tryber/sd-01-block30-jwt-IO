const express = require('express');

const { Purchase, getAll, getById, deletePurchase } = require('../models/purchaseModel');

const router = express.Router();

router.get('/:userID', async (req, res) => {
  const { userID } = req.params;
  const purchases = await getAll(userID);

  res.status(200).json(purchases);
});

router.get('/:userID/:id', async (req, res) => {
  const { userID, id } = req.params;
  const purchases = await getById(userID, id);

  res.status(200).json(purchases);
});

router.post('/:userID', async (req, res) => {
  const { productId, quantity } = req.body;
  const { userID } = req.params;

  const newProduct = new Purchase(userID, productId, quantity);
  await newProduct.add();

  res.status(201).json(newProduct);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await deletePurchase(id);

  res.status(204).end();
});

router.put('/:id', async (req, res) => {
  const { userID, productId, quantity } = req.body;
  const { id } = req.params;

  const products = new Purchase(userID, productId, quantity);
  const updateProducts = await products.update(id);

  if (updateProducts === 'idPurchase invalid')
    return res.status(400).json({ message: updateProducts });

  res.status(200).json(products);
});

module.exports = router;
