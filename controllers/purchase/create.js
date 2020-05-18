const Purchase = require('../../models/purchase');
const rescue = require('../rescue');
const FILE_NAME = 'purchases';

const create = async (req, res) => {
  const { productId, quantity } = req.body;
  console.log(req.user, 'user');
  const userID = req.user.id
  if (!Purchase.validPurchase(req.body)) {
    return res.status(422).json({ message: 'Dados inválidos' });
  }

  const purchaseData = {
    userID,
    productId,
    quantity,
  };

  Purchase.save(purchaseData, FILE_NAME).then((purchase) => {
    res.status(201).json(purchase);
  });
};

module.exports = rescue(create);
