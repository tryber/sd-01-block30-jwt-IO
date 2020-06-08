const express = require('express');
const Purchase = require('../models/purchase');

const router = express.Router();
const {
  purchases: { validateBuy, validateUpdate },
} = require('../validation');

router.get('/', async (req, res) => {
  const allPurchases = await Purchase.getAllPurchases(req.decoded);
  res.status(200).json(allPurchases);
});

router.get('/:id', async (req, res) => {
  const purchases = await Purchase.findPurchaseById(req.decoded, req.params.id);
  if(!purchases) return res.status(404).send({ message: "id not found"});
  res.status(200).json(purchases);
});

router.post('/', async (req, res) => {
  if (validateBuy(req.body)) {
    const addPurchase = await Purchase.addPurchase(req.body, req.decoded);
    if (!addPurchase) return res.status(422).json({ message: 'Dados inválidos!' });
    return res.status(201).json(addPurchase);
  }
  return res.status(422).json({ message: 'Dados inválidos!' });
});

router.put('/:id', async (req, res) => {
  if (validateUpdate(req.body)) {
    const updatePurchase = await Purchase.updatePurchase(req.decoded, req.body, req.params.id);
    if(!updatePurchase) return res.status(422).json({ message: 'Dados inválidos!' });
    return res.status(200).json({message: 'sucess'});
  }
  return res.status(422).json({ message: 'Dados inválidos!' });
});

router.delete('/:id', async (req, res) => {
  const deletePurchase = await Purchase.deletePurchase(req.decoded, req.params.id);
  if(!deletePurchase) {
    return res.status(401);
  }
  return res.status(204).json(deletePurchase);
});

module.exports = router;
