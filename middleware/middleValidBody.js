const Product = require('../models/product');
const Purchase = require('../models/purchase');
const User = require('../models/user');

const valid = type => async (req, res, next) => {
  const { body } = req;
  try {
    const objValid = {
      purchase: bodyReq => Purchase.validPurchase(bodyReq),
      product: bodyReq => Product.validProduct(bodyReq),
      user: bodyReq => User.isValidDados(bodyReq),
    };

    if (!objValid[type](body))
      return res.status(422).json({ message: 'Dados inválidos' });

    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  valid,
};
