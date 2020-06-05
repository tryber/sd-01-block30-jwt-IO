const utils = require('./utils');

async function viewAllPurchases() {
  const purchaseData = await utils.getData('purchases');
  return purchaseData;
}

async function viewPurchases(purchaseId) {
  return (await viewAllPurchases()).find(item => item.id === purchaseId);
}

async function createPurchases(purchase, userID) {
  const purchaseObj = { userID, ...purchase };
  const item = utils.addItemWithId('purchases', purchaseObj);
  return item;
}

async function deletePurchases(purchaseId) {
  const purchases = (await viewAllPurchases()).filter(purchase => purchase.id !== purchaseId);
  utils.setData('purchases', purchases);
  return purchases;
}

async function updatePurchases(purchaseId, newPurchase, userID) {
  await deletePurchases(purchaseId);
  const purchaseObj = { userID, ...newPurchase };
  utils.addItemWithId('purchases', purchaseObj, purchaseId);
}

const Purchases = {
  viewAllPurchases,
  viewPurchases,
  createPurchases,
  deletePurchases,
  updatePurchases,
};

module.exports = Purchases;
