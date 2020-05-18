const Purchase = require('../../models/purchase');
const rescue = require('../rescue');

const FILE_NAME = 'purchases';

const create = async (req, res) => {
  const { productId, quantity } = req.body;
  console.log(req.user, 'user');
  const userID = req.user.id;
  if (!Purchase.validPurchase(req.body)) return res.status(422).json({ message: 'Dados inválidos' });

  const purchaseData = {
    userID,
    productId,
    quantity,
  };

  const resultPurchase = await Purchase.save(purchaseData, FILE_NAME);
  res.status(201).json(resultPurchase);
};

module.exports = rescue(create);
