const Purchases = require('../../models/purchases');

module.exports = async (req, res) => {
  const purchaseId = req.params.id;
  const purchase = req.body;
  const userID = req.user.id;
  if (!purchaseId) return res.status(400).json({ message: 'Parâmetro Inválido!' });
  if (!purchase) return res.status(400).json({ message: 'Parâmetro Inválido!' });
  return Purchases.updatePurchases(purchaseId, purchase, userID).then(() => res.status(200).json({ message: 'Atualizado com sucesso!' }));
};
