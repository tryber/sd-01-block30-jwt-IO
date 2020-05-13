const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const getFile = async () => {
  const content = await fs.readFile(
    path.resolve(__dirname, '..', 'products.json')
  );
  return JSON.parse(content.toString('utf-8'));
};

const writing = async content =>
  fs.writeFile(
    path.resolve(__dirname, '..', 'products.json'),
    JSON.stringify(content),
    err => {
      if (err) throw err;
    }
  );
const Product = {
  allProducts: async () => {
    const products = await getFile();
    return products;
  },
  addProduct: async product => {
    const products = await getFile();
    product.id = uuidv4();
    products.push(product);

    await writing(products);
  },
  findByName: async name => {
    const products = await getFile();
    return products.find(product => product.name === name);
  },
  updateProduct: async product => {
    const products = await getFile();
    const newProducts = products.filter(each => each.name !== product.name);
    product.id = uuidv4();
    newProducts.push(product);

    await writing(newProducts);
  },
  deleteProduct: async product => {
    const products = await getFile();
    const newProducts = products.filter(each => each.name !== product.name);

    await writing(newProducts);
  },
};

module.exports = Product;
