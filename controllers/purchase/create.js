const Purchase = require('../../models/purchase');
const rescue = require('../rescue');

const create = async (req, res) => {
  const { productId, quantity } = req.body;
  const { id } = req.user;
  if (!Purchase.validPurchase(req.body)) {
    return res.status(422).json({ message: 'Dados inválidos' });
  }

  const purchaseData = {
    userID: id,
    productId,
    quantity,
  };

  Purchase.save(purchaseData).then((purchase) => {
    res.status(201).json(purchase);
  });
};

module.exports = rescue(create);
