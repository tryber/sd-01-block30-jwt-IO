const { v4: uuidv4 } = require('uuid');

const { writeFileJson, readFileJson } = require('../fs-functions');

class Purchase {
  constructor(userID, productId, quantity) {
    this.id = null;
    this.userID = userID;
    this.productId = productId;
    this.quantity = quantity;
  }

  async addProduct() {
    const purchases = await readFileJson('purchases');

    this.id = uuidv4();
    purchases.push(this);

    await writeFileJson(purchases, 'purchases');

    return this;
  }

  async updateProcuct(idPurchase) {
    const purchases = await readFileJson('purchases');
    const purchase = purchases.find(({ id }) => id === idPurchase);

    if (!purchase) return 'idPurchase invalid';

    this.id = idPurchase;
    purchase.userID = this.userID;
    purchase.productId = this.productId;
    purchase.quantity = this.quantity;

    await writeFileJson(purchases, 'purchases');

    return purchases;
  }
}

async function filterPurchases(userId) {
  const purchases = await readFileJson('purchases');
  return purchases.filter(({ userID }) => userID === userId);
}

async function getAll(userId) {
  const listPurchases = await filterPurchases(userId);
  return listPurchases;
}

async function getById(userID, idPurchase) {
  const listPurchases = await filterPurchases(userID);
  const purchase = listPurchases.find(({ id }) => id === idPurchase);

  return purchase;
}

async function deletePurchase(idPurchase) {
  const rawData = await readFileJson('purchases');
  const purchases = rawData.filter(({ id }) => id !== idPurchase);

  await writeFileJson(purchases, 'purchases');
  return 'Purchase excluded with success';
}

module.exports = {
  deletePurchase,
  getAll,
  getById,
  Purchase,
};
