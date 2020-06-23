const express = require('express');

const router = express.Router();

const rescue = require('../service/rescue');

const Purchases = require('../models/purchases');

const validateTokenPurchases = require('../middlewares/purchases');

const User = require('../models/users');

const callBackDoPurchases = async (req, res) => {
  const { productId, quantity, userID } = req.body;
  const {
    data: { id },
  } = req.user;
  const user = User.getById(id);
  if (userID !== user.id)
    return res.status(401).json({ message: 'Não autorizado' });
  const product = new Purchases(id, productId, quantity);
  await product.addPurchase(productId).then(body => {
    const { image, ...product } = body;
    return res.status(201).json(product);
  });
};

const callBackGetAllPurchases = async (req, res) => {
  const {
    data: { id },
  } = req.user;
  const purchases = await Purchases.getAllPurchases(id);
  if (!purchases)
    return res.status(400).json({ message: 'Não existe cadastrados produtos' });
  return res.status(200).json(purchases);
};

const callBackGetOnePurchaseForID = async (req, res) => {
  const {
    data: { id },
  } = req.user;
  const { id: idPurchase} = req.params;
  const purchase = await Purchases.getByIdPurchase(id, idPurchase);
  if (!purchase) return res.status(400).json({ message: 'compra não exite' });
  return res.status(200).json(purchase);
};

const callBackDeleteOnePurchasesForID = async (req, res) => {
  const {
    data: { id },
  } = req.user;
  const { id: idPurchase } = req.params;
  const allNewPurchases = await Purchases.deletePurchases(id, idPurchase);
  if (!allNewPurchases) return res.status(400).json({ message: 'compra não exite' });
  return res.status(204).json();
};

const callBackPutOneProductsForID = async (req, res) => {
  const { userID, productId, quantity } = req.body;
  const { id } = req.params;
  const purchase = new Purchases(userID, productId, quantity);
  const editPurchase = await purchase.editProductCart(id);
  if (!editPurchase) return res.status(400).json({ message: 'compra não exite' });
  return res.status(200).json(editPurchase);
};

router.get(
  '/purchases',
  rescue(validateTokenPurchases),
  rescue(callBackGetAllPurchases),
);
router.get(
  '/purchases/:id',
  rescue(validateTokenPurchases),
  rescue(callBackGetOnePurchaseForID),
);

router.post(
  '/purchases',
  rescue(validateTokenPurchases),
  rescue(callBackDoPurchases),
);

router.put(
  '/purchases/:id',
  rescue(validateTokenPurchases),
  rescue(callBackPutOneProductsForID),
);

router.delete(
  '/purchases/:id',
  rescue(validateTokenPurchases),
  rescue(callBackDeleteOnePurchasesForID),
);

module.exports = router;
