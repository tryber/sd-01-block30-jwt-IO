const Purchases = require('../../models/purchases');

module.exports = async (_req, res) => {
  const purchasesList = await Purchases.viewAllPurchases();
  return res.status(200).json(purchasesList);
};
