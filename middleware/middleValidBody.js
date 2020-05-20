const Product = require('../models/product');
const Purchase = require('../models/purchase');
const User = require('../models/user');

const valid = type => async (req, res, next) => {
  try {
    const objValid = {
      purchase: () => Purchase.validPurchase(req.body),
      product: () => Product.validProduct(req.body),
      user: () => User.isValidDados(req.body),
    };

    if (!objValid[type]())
      return res.status(422).json({ message: 'Dados inválidos' });

    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  valid,
};
