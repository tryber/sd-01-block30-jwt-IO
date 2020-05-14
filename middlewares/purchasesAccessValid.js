const jwt = require('jsonwebtoken');

const { secret } = require('../config');
const { readFileJson } = require('../modifyFile');

async function productIdValid(productId = '') {
  const productExists = await readFileJson('products');
  return productExists.find(({ id }) => id === productId);
}

function productQuantity(quantity = '') {
  return Number.isInteger(quantity) && quantity > 0;
}

async function userIdValid(userID = '') {
  const userExists = await readFileJson('users');
  return userExists.find(({ id }) => id === productId);
}

function increaseNewPurchase(req, res, next) {
  const { productId, quantity } = req.body;

  if (!productIdValid(productId) || !productQuantity(quantity))
    return res.status(400).json({ message: 'ProductId or quantity invalid' });

  next();
}

function updatePurchase(req, res, next) {
  const { userID, productId, quantity } = req.body;

  if (!userIdValid(userID) || !productIdValid(productId) || !productQuantity(quantity))
    return res.status(400).json({ message: 'ProductId or quantity invalid' });

  next();
}

module.exports = { increaseNewPurchase, updatePurchase };
