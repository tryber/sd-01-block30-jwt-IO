const Product = require('../models/product');
const Purchase = require('../models/purchase');

module.exports = (type) = async (req, res, next) => {
  const objValid = {
    'purchase': () => Purchase.validPurchase(req.body),
    'product': () => Product.validProduct(req.body),
  }
  console.log(objValid[type])
  if (!objValid[type])
    return res.status(422).json({ message: 'Dados inválidos' });

  next()
};
