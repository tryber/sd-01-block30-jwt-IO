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

class Product {
  constructor(req) {
    this.id = null;
    this.name = req.name;
    this.description = req.description;
    this.price = req.price;
  }

  async add() {
    const products = await readFileJson('products');

    this.id = uuidv4();
    products.push(this);

    await modifyFile(products, 'products');

    return this;
  }

  async update(idProduct) {
    const products = await readFileJson('products');
    const product = products.find(({ id }) => id === idProduct);

    if (!product) return 'Id invalid';

    this.id = idProduct;
    product.name = this.name;
    product.description = this.description;
    product.price = this.price;

    await modifyFile(products, 'products');

    return products;
  }
}

module.exports = { Product, getAll, getById, deleteProduct };
