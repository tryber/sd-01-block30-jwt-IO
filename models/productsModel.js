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

async function getById(idProduct) {
  const data = await readFileJson('products');
  const product = data.find(({ id }) => id === idProduct);
  return product;
}

async function deleteProduct(id) {
  const getProduct = await readFileJson('products');
  const products = getProduct.filter(product => product.id !== id);

  if (getProduct.length === products.length)
    return 'Id invalid';

  await writeFileJson(products, 'products');
}

async function updateProduct(idProduct, req) {
  const products = await readFileJson('products');
  const product = products.find(({ id }) => id === idProduct);

  if (!product) return 'Id invalid';

  const fileJson = products.indexOf(product);
  const updateJson = { id: idProduct, ...req };
  products[fileJson] = updateJson;

  await writeFileJson(products, 'products');

  return updateJson;
}

module.exports = {
  addProduct,
  deleteProduct,
  getAllProducts,
  getById,
  updateProduct,
};
