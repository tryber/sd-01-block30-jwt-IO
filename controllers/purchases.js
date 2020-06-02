const express = require('express');

const rescue = require('../utils');

const { Purchase, getAll, getById, deletePurchase } = require('../models/purchaseModel');
const {
  increaseNewPurchase,
  updatePurchase,
  excludePurchase,
  tokenValid,
  authorizationValidMiddleware,
} = require('../middlewares/purchasesAccessValid');

const router = express.Router();

router.use(rescue(authorizationValidMiddleware));

router.get('/', async (req, res) => {
  const { id: userID } = tokenValid(req.headers.authorization);
  const purchases = await getAll(userID);

  res.status(200).json(purchases);
});

router.get('/:id', async (req, res) => {
  const { id: userID } = tokenValid(req.headers.authorization);
  const { id } = req.params;
  const purchases = await getById(userID, id);

  if (!purchases) return res.status(400).json({ message: 'idPurchase invalid' });

  res.status(200).json(purchases);
});

router.post('/', increaseNewPurchase, async (req, res) => {
  const { id: userID } = tokenValid(req.headers.authorization);
  const { productId, quantity } = req.body;

  const newProduct = new Purchase(userID, productId, quantity);
  await newProduct.add();

  res.status(201).json(newProduct);
});

router.delete('/:id', excludePurchase, async (req, res) => {
  const { id } = req.params;
  await deletePurchase(id);

  res.status(204).end();
});

router.put('/:id', updatePurchase, async (req, res) => {
  const { userID, productId, quantity } = req.body;
  const { id } = req.params;

  const products = new Purchase(userID, productId, quantity);
  const updateProducts = await products.update(id);

  if (updateProducts === 'idPurchase invalid')
    return res.status(400).json({ message: updateProducts });

  res.status(200).json(products);
});

module.exports = router;
