const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const { modifyFile } = require('../modifyFile');

async function getAll() {
  const rawData = await fs.readFile(path.resolve(__dirname, '..', 'products.json'), 'utf8');
  const products = JSON.parse(rawData);

  return products;
}

async function getById(idProduct) {
  const rawData = await fs.readFile(path.resolve(__dirname, '..', 'products.json'), 'utf8');
  const product = JSON.parse(rawData)
    .find(({ id }) => id === idProduct);

  return product;
}

async function deleteProduct(id) {
  const rawData = await fs.readFile(path.resolve(__dirname, '..', 'products.json'), 'utf8');
  const products = JSON.parse(rawData).filter(product => product.id !== id);

  await modifyFile(products, 'products');

  return products;
}

class Product {
  constructor(name, description, price) {
    this.id = null;
    this.name = name;
    this.description = description;
    this.price = price;
  }

  async add() {
    const rawData = await fs.readFile(path.resolve(__dirname, '..', 'products.json'), 'utf8');
    const products = JSON.parse(rawData);

    this.id = uuidv4();
    products.push(this);

    await modifyFile(products, 'products');

    return this;
  }

  async update(idProduct) {
    const rawData = await fs.readFile(path.resolve(__dirname, '..', 'products.json'), 'utf8');
    const products = JSON.parse(rawData);

    const product = products.find(({ id }) => id === idProduct);

    if (!product) return 'id invalid';

    this.id = idProduct;
    product.name = this.name;
    product.description = this.description;
    product.price = this.price;

    await modifyFile(products, 'products');

    return products;
  }
}

module.exports = { Product, getAll, getById, deleteProduct };
