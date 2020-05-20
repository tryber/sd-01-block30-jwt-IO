const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { getFile } = require('../service.js');

const writing = async content =>
  fs.writeFile(
    path.resolve(__dirname, '..', 'products.json'),
    JSON.stringify(content),
    (err) => {
      if (err) throw err;
    },
  );
const Product = {
  allProducts: async () => {
    const products = await getFile('products.json');
    return products;
  },
  addProduct: async (product) => {
    const products = await getFile('products.json');
    product.id = uuidv4();
    products.push(product);

    await writing(products);
    return product;
  },
  findById: async (id) => {
    const products = await getFile('products.json');
    return products.find(product => product.id === id);
  },
  updateProduct: async (product, id) => {
    const products = await getFile('products.json');
    const newProducts = products.filter(each => each.id !== id);
    product.id = id;
    newProducts.push(product);

    await writing(newProducts);
  },
  deleteProduct: async (id) => {
    const products = await getFile('products.json');
    const newProducts = products.filter(each => each.id !== id);

    await writing(newProducts);
  },
};

module.exports = Product;
