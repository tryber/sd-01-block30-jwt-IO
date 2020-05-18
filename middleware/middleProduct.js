const Product = require('../models/product');

const valid = async (req, res, next) => {
  if (!Product.validProduct(req.body)) {
    return res.status(422).json({ message: 'Dados inválidos' });
  }
  next()
};

module.exports = {
  valid,
}
