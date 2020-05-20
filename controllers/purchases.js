const express = require('express');
const Purchase = require('../models/product');

const router = express.Router();
const {
  purchases: { validateBuy, validateUpdate },
} = require('../validation');

router.get('/', async (req, res) => {
    const allPurchases = await Purchase.allPurchases(req.user);
    res.status(200).json(allPurchases);
});

router.get('/:id', async (req, res) => {
    const purchases = await Purchase.findById(req.user.name, req.params.id);
    res.status(200).json(purchases);
});

router.post('/', async (req, res) => {
    const addPurchase = await Purchase.addPurchase(req.body, req.user);
});

router.put('/:id', async (req, res) => {

});

router.delete('/:id', async (req, res) => {

});