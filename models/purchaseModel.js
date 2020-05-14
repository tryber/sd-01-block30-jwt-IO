const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const { modifyFile } = require('../modifyFile');

async function filterPurchases(userId) {
  const rawData = await fs.readFile(path.resolve(__dirname, '..', 'purchases.json'), 'utf8');
  const purchases = JSON.parse(rawData);
  return purchases.filter(({ userID }) => userID === userId);
}

async function getAll(userId) {
  const listPurchases = await filterPurchases(userId);
  return listPurchases;
}

async function getById(userID, idPurchase) {
  const listPurchases = await filterPurchases(userID);
  const purchase = listPurchases
    .find(({ id }) => id === idPurchase);

  return purchase;
}

async function deletePurchase(userId, idPurchase) {
  const rawData = await fs.readFile(path.resolve(__dirname, '..', 'products.json'), 'utf8');
  const purchases = JSON.parse(rawData)
    .filter(({ id, userID }) => id !== userId && userID !== idPurchase);

  await modifyFile(purchases, 'purchases');

  return purchases;
}

class Purchase {
  constructor(userID, productId, quantity) {
    this.id = null;
    this.userID = userID;
    this.productId = productId;
    this.quantity = quantity;
  }

  async add() {
    const rawData = await fs.readFile(path.resolve(__dirname, '..', 'purchases.json'), 'utf8');
    const purchases = JSON.parse(rawData);

    this.id = uuidv4();
    purchases.push(this);

    await modifyFile(purchases, 'purchases');

    return this;
  }

  async update(idPurchase) {
    const rawData = await fs.readFile(path.resolve(__dirname, '..', 'purchases.json'), 'utf8');
    const purchases = JSON.parse(rawData);

    const purchase = purchases.find(({ id }) => id === idPurchase);

    if (!purchase) return 'userID invalid';

    this.id = idPurchase;
    purchase.userID = this.userID;
    purchase.productId = this.productId;
    purchase.quantity = this.quantity;

    await modifyFile(purchases, 'purchases');

    return purchases;
  }
}

module.exports = { Purchase, getAll, getById, deletePurchase };
