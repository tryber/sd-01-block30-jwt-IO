const Purchases = require('../../models/purchases');

module.exports = async (req, res) => (
  Purchases.viewPurchases(req.params.id).then(purchase => res.status(200).json(purchase))
);
