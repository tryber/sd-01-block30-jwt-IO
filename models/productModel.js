const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');


class Product {
  constructor(name, description, price) {
    this.id = null;
    this.name = name;
    this.description = description;
    this.price = price;
  }

  async getAll() {
    const rawData = await fs.readFile(path.resolve(__dirname, '..', 'data', 'products.json'), 'utf8');
    const products = JSON.parse(rawData);

    return products;
  }

  async getById(id) {
    const rawData = await fs.readFile(path.resolve(__dirname, '..', 'data', 'products.json'), 'utf8');
    const product = JSON.parse(rawData)
      .find((product) => product.id === parseInt(id));

    return product;
  }

  async add() {
    const rawData = await fs.readFile(path.resolve(__dirname, '..', 'data', 'products.json'), 'utf8');
    const products = JSON.parse(rawData);

    this.id = uuidv4();
    products.push(this);

    await fs.writeFile(path.resolve(__dirname, '..', 'data', 'products.json'),
      JSON.stringify(products), 'utf8', (err) => {
        if (err) throw err;
        console.log('Ocorreu algum erro!');
      });

    return this;
  }

  async delete(id) {
    const rawData = await fs.readFile(path.resolve(__dirname, '..', 'data', 'products.json'), 'utf8');
    const products = JSON.parse(rawData).filter(product => product.id !== parseInt(id));

    await fs.writeFile(path.resolve(__dirname, '..', 'data', 'products.json'),
      JSON.stringify(products), 'utf8', (err) => {
        if (err) throw err;
        console.log('Ocorreu algum erro!');
      });

    return products;
  }

  async addOrUpdate(id) {
    const rawData = await fs.readFile(path.resolve(__dirname, '..', 'data', 'products.json'), 'utf8');
    const products = JSON.parse(rawData);

    const product = products.find(product => product.id === parseInt(id));

    if (product) {
      product.name = this.name;
      product.description = this.description;
      product.price = this.price;
    } else {
      this.id = uuidv4();
      products.push(this);
    }

    await fs.writeFile(path.resolve(__dirname, '..', 'data', 'products.json'),
      JSON.stringify(products), 'utf8', (err) => {
        if (err) throw err;
        console.log('Ocorreu algum erro!');
      });

    return products;
  }
}

module.exports = Product;
