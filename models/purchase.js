const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { getFile } = require('../service.js');

const writing = async content =>
  fs.writeFile(
    path.resolve(__dirname, '..', 'purchase.json'),
    JSON.stringify(content),
    err => {
      if (err) throw err;
    }
  );

const userId = async data =>
  await getFile('users.json').find(user => user.name === data.name);

const Purchase = {
  allPurchases: async param => {
    const id = await userId(param).id;
    const purchases = await getFile('purchases.json').filter(
      purchase => purchase.userID === id
    );
    return purchases;
  },
  addProduct: async (product, data) => {
    const user = await findUser(data);
    const purchases = await getFile('purchases.json');
    product.id = uuidv4();
    purchase.push(product);

    await writing(purchase);
  },
  findById: async (name, id) => {
    const user = await userId({ data: name }).id;
    const purchase = await getFile('purchases.json').filter(
      purchase => purchase.userID === user && purchase.id === id
    );

    return purchase;
  },
  updateProduct: async (product, id) => {
    const purchase = await getFile('purchases.json');
    const newpurchase = purchase.filter(each => each.id !== id);
    product.id = id;
    newpurchase.push(product);

    await writing(newpurchase);
  },
  deleteProduct: async id => {
    const purchase = await getFile('purchases.json');
    const newpurchase = purchase.filter(each => each.id !== id);

    await writing(newpurchase);
  },
};

module.exports = Product;
