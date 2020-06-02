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

async function viewProducts(productId) {
  return (await viewAllProducts()).find(item => item.id === productId);
}

async function createProducts(product) {
  const item = utils.addItemWithId('products', product);
  return item;
}

async function deleteProducts(productId) {
  const productList = (await viewAllProducts()).filter(item => item.id !== productId);
  utils.setData('products', productList);
  return productList;
}

async function updateProducts(productId, newProduct) {
  const product = await viewProducts(productId);
  newProduct.id = product.id;
  await deleteProducts(productId);
  utils.addItem('products', newProduct);
}

const Products = {
  viewAllProducts,
  viewProducts,
  createProducts,
  deleteProducts,
  updateProducts,
  validateProduct,
};

module.exports = Products;
