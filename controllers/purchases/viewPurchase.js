const Purchases = require('../../models/purchases');

module.exports = async (req, res) => {
  const id = req.params.id;
  return Purchases.viewPurchases(id).then(purchase => res.status(200).json(purchase));
};
