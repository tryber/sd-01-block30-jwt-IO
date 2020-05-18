const Purchase = require('../models/purchase');

const valid = async (req, res, next) => {
  if (!Purchase.validPurchase(req.body)) {
    return res.status(422).json({ message: 'Dados inválidos' });
  }
  next()
};

module.exports = {
  valid,
}
