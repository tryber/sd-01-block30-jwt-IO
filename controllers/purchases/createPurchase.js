const Purchases = require('../../models/purchases');

module.exports = async (req, res) => {
  const purchase = req.body;
  const userId = req.user.id;
  if (!purchase || !userId) return res.status(400).json({ message: 'Parâmetro Inválido!' });
  return Purchases.createPurchases(purchase, userId).then(item => res.status(201).json(item));
};
