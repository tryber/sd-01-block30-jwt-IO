const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const getFile = async () => {
  const content = await fs.readFile(
    path.resolve(__dirname, '..', 'products.json')
  );
  return JSON.parse(content.toString('utf-8'));
};

const Product = {
  allProducts: async () => {
    const products = await getFile();
    return products;
  },
  addProduct: async product => {
    const products = await getFile();
    product.id = uuidv4();
    products.push(product);

    fs.writeFile(
      path.resolve(__dirname, '..', 'products.json'),
      JSON.stringify(products),
      err => {
        if (err) throw err;
      }
    );
  },
  //   findOne: async log => {
  //     const users = await getFile();
  //     return users.find(
  //       user => user.username === log.username && user.password === log.password
  //     );
  //   },
};

module.exports = Product;
