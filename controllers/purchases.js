const express = require('express');
const Purchase = require('../models/purchase');

const router = express.Router();
const {
  purchases: { validateBuy, validateUpdate },
} = require('../validation');

router.get('/', async (req, res) => {
  const allPurchases = await Purchase.allPurchases(req.decoded);
  res.status(200).json(allPurchases);
});

router.get('/:id', async (req, res) => {
  const purchases = await Purchase.findById(req.user.name, req.params.id);
  res.status(200).json(purchases);
});

router.post('/', async (req, res) => {
  if (validateBuy(req.body)) {
    const addPurchase = await Purchase.addPurchase(req.body, req.user);
    return res.status(201).json(addPurchase);
  }
  return res.status(422).json({ message: 'Dados inválidos!' });
});

router.put('/:id', async (req, res) => {
  if (validateUpdate(req.body)) {
    const updatePurchase = await Purchase.updatePurchase(req.body);
    r;
  }
});

// router.delete('/:id', async (req, res) => {

// });

module.exports = router;
