const { readFileJson, writeFileJson } = require('../fs-functions');
const { v4: uuid4 } = require('uuid');

async function getAllProducts() {
    const products = await readFileJson('products');
    return products;
}

async function addProduct(req) {
  const newProduct = await readFileJson('products');
  const product = { id: uuid4(), ...req };
  newProduct.push(product);

  await writeFileJson(newProduct, 'products');
  return product;
}

async function deleteProduct(id) {
  const getProduct = await readFileJson('products');
  const products = getProduct.filter(product => product.id !== id);

  if (getProduct.length === products.length)
    return 'Id invalid';

  await writeFileJson(products, 'products');
}

module.exports = {
  getAllProducts,
  addProduct,
  deleteProduct,
};
