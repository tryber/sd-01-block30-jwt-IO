const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { getFile } = require('../service.js');

const writing = async content =>
  fs.writeFile(
    path.resolve(__dirname, '..', 'purchases.json'),
    JSON.stringify(content),
    err => {
      if (err) throw err;
    }
  );

const findUser = async data => {
  const users = await getFile('users.json');
  const user = users.find(user => user.username === data.username);
  return user;
}

const productExists = async ({ productId }) => {
  const products = await getFile('products.json');
  const exists = products.some(product => product.id === productId);
  return exists;
}

const allPurchases = async (data) => {
  const user = await findUser(data);
  const purchases = await getFile('purchases.json');
  return purchases.filter(purchase => purchase.userID === user.id);
}

const Purchase = {
  allPurchases: async data => {
    return await allPurchases(data);
  },
  addPurchase: async (product, data) => {
    const exist = await productExists(product);
    if (!exist) return false;
    const user = await findUser(data);
    const purchases = await getFile('purchases.json');

    product.id = uuidv4();
    product.userID = user.id;
    purchases.push(product);

    await writing(purchases);
    return product;
  },
  deletePurchase: async (data, id) => {
    const user = await findUser(data);
    const purchases = await getFile('purchases.json');
    const findPurchase = purchases.filter(purchase => {
      if (purchase.id === id && purchase.userID === user.id) {
        return null;
      }
      return purchase;
    }
    );
    if(findPurchase.length === purchases.length) {
      return false;
    }
    await writing(findPurchase);
    return true;
  },
};

module.exports = Purchase;
