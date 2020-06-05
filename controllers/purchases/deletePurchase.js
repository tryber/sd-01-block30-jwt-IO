const Purchases = require('../../models/purchases');

module.exports = async (req, res) => {
  const purchaseId = req.params.id;
  if (!purchaseId) return res.status(400).json({ message: 'Parâmetro Inválido!' });
  return Purchases.deletePurchases(purchaseId).then(() => res.status(204).json());
};
