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

const userId = async data =>
  await getFile('users.json');

const Purchase = {
  allPurchases: async param => {
    const id = await userId(param).id;
    const purchases = await getFile('purchases.json').filter(
      purchase => purchase.userID === id
    );
    return purchases;
  },
  addPurchase: async (product, data) => {
    const users = await userId(data);
    const user = users.find(user => user.username === data.username);
    const purchases = await getFile('purchases.json');
    product.id = uuidv4();
    product.userID = user.id;
    purchases.push(product);

    await writing(purchases);
    return product;
  },
  findById: async (name, id) => {
    const user = await userId({ data: name }).id;
    const purchase = await getFile('purchases.json').filter(
      purchase => purchase.userID === user && purchase.id === id
    );

    return purchase;
  },
  updatePurchase: async (data) => {
    const purchases = await getFile('purchases.json');
    const currentyPurchase = purchases.filter(each => each.id === data.id);
    if(currentyPurchase.userID !== data.userID) {
      return '401';
    }
    newpurchase.push(product);

    await writing(newpurchase);
  },
  deleteProduct: async id => {
    const purchase = await getFile('purchases.json');
    const newpurchase = purchase.filter(each => each.id !== id);

    await writing(newpurchase);
  },
};

module.exports = Purchase;
