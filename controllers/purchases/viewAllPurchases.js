const Purchases = require('../../models/purchases');

module.exports = async (_req, res) => (
  res.status(200).json(await Purchases.viewAllPurchases())
);
