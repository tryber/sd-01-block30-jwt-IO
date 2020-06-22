const express = require('express');

const purchaseModel = require('../models/purchaseModel');

const purchaseMiddleware = require('../middlewares/purchases');

const router = express.Router();

router.use(purchaseMiddleware.authorizationValidMiddleware);

router.get('/', async (req, res) => {
  const { id: userID } = purchaseMiddleware.isTokenValid(req.headers.authorization);
  const purchases = await purchaseModel.getAll(userID);

  res.status(200).json(purchases);
});

router.get('/:id', async (req, res) => {
  const { id: userID } = purchaseMiddleware.isTokenValid(req.headers.authorization);
  const { id } = req.params;
  const purchases = await purchaseModel.getById(userID, id);

  if (!purchases) return res.status(400).json({ message: 'idPurchase invalid' });

  res.status(200).json(purchases);
});

router.post('/', purchaseMiddleware.increaseNewPurchase, async (req, res) => {
  const { id: userID } = purchaseMiddleware.isTokenValid(req.headers.authorization);
  const { productId, quantity } = req.body;

  const newProduct = new purchaseModel.Purchase(userID, productId, quantity);
  await newProduct.addProduct();

  res.status(201).json(newProduct);
});

router.delete('/:id', purchaseMiddleware.excludePurchase, async (req, res) => {
  const { id } = req.params;
  await purchaseModel.deletePurchase(id);

  res.status(204).end();
});

router.put('/:id', purchaseMiddleware.updatePurchase, async (req, res) => {
  const { userID, productId, quantity } = req.body;
  const { id } = req.params;

  const products = new purchaseModel.Purchase(userID, productId, quantity);
  const updateProducts = await products.updateProcuct(id);

  if (updateProducts === 'idPurchase invalid')
    return res.status(400).json({ message: updateProducts });

  res.status(200).json(products);
});

module.exports = router;
