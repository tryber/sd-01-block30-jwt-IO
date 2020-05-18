const { v4: uuidv4 } = require('uuid');

const { modifyFile, readFileJson } = require('../modifyFile');

async function getAll() {
  const products = await readFileJson('products');
  return products;
}

async function getById(idProduct) {
  const rawData = await readFileJson('products');
  const product = rawData.find(({ id }) => id === idProduct);
  return product;
}

async function deleteProduct(id) {
  const rawData = await readFileJson('products');
  const products = rawData.filter(product => product.id !== id);

  if (rawData.length === products.length)
    return 'Id invalid';

  await modifyFile(products, 'products');
}

async function addProduct(req) {
  const products = await readFileJson('products');
  const product = { id: uuidv4(), ...req };
  products.push(product);

  await modifyFile(products, 'products');
  return product;
}

async function updateProduct(idProduct, req) {
  const products = await readFileJson('products');
  const product = products.find(({ id }) => id === idProduct);

  if (!product) return 'Id invalid';

  const fileJson = products.indexOf(product);
  const updateJson = { id: idProduct, ...req };
  products[fileJson] = updateJson

  await modifyFile(products, 'products');

  return updateJson;
}

module.exports = { getAll, getById, deleteProduct, addProduct, updateProduct };
