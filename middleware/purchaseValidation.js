const Purchases = require('../models/purchases');
const Products = require('../models/products');
const User = require('../models/user');

async function validateUserPurchase(req, res, next) {
  const purchaseId = req.params.id;
  const user = req.user;
  try {
    if (!purchaseId) return res.status(400).json({ message: 'Dados incompletos' });
    const purchase = await Purchases.viewPurchases(purchaseId);
    if (!purchase) return res.status(404).json({ message: 'Item não encontrado' });
    if (purchase.userID !== user.id)
      return res.status(401).json({ message: 'Compra de outra pessoa' });
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function validatePurchaseId(req, res, next) {
  const purchaseId = req.params.id;
  try {
    if (!purchaseId) return res.status(400).json({ message: 'Dados incompletos' });
    if (!(await Purchases.viewPurchases(purchaseId)))
      return res.status(404).json({ message: 'Item não encontrado' });
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function validatePurchase(req, res, next) {
  const user = req.user;
  const body = req.body;
  try {
    if (!body.productId || !body.quantity)
      return res.status(400).json({ message: 'Dados incompletos' });

    if (!(await Products.viewProducts(body.productId)))
      return res.status(404).json({ message: 'Produto inexistente' });

    if (!(await User.findById(user)))
      return res.status(422).json({ message: 'Usuário inválido' });
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  validatePurchase,
  validatePurchaseId,
  validateUserPurchase,
};
