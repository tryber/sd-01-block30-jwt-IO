const utils = require('./utils');

const nameRegex = /[a-z0-9]*[A-Z0-9]*/g;

function validateProduct({ name, price }) {
  if (name.length < 5 || !name.match(nameRegex)) return false;
  if (isNaN(price) || price <= 0) return false;
  return true;
}

async function viewAllProducts() {
  const productData = await utils.getData('products');
  return productData;
}

async function viewProducts(product) {
  const productData = await utils.getData('products');
  return productData.filter(item => item === product);
}

async function createProducts(product) {
  const item = utils.addItemWithId('products', product);
  return item;
}

const Products = {
  viewAllProducts,
  viewProducts,
  createProducts,
  // deleteProducts,
  // updateProducts,
  validateProduct,
};

module.exports = Products;
