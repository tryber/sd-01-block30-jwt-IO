const readAndWrite = require('../service/readAndWrite');
const { verifyProducts } = require('../service/checkers');
const { v4: uuidv4 } = require('uuid');

class Products {
  constructor(name, description, price, image) {
    this.id = null;
    this.name = name;
    this.description = description;
    this.price = price;
    this.image = image;
  }

  static async getAllProducts() {
    const allUsers = await readAndWrite('read', 'products.json');
    return allUsers.map(product => product);
  }

  static async getByIdProducts(id) {
    const allUsers = await readAndWrite('read', 'products.json');
    return allUsers.find(person => person.id === id);
  }

  async addNewProducts(image) {
    const allProducts = await readAndWrite('read', 'products.json');
    if (!verifyProducts(this)) throw new Error('Valores invalidos! 😱');
    this.id = uuidv4();
    this.image = image;
    allProducts.push(this);
    await readAndWrite('write', 'products.json', allProducts);
    return this;
  }

  static async deleteProducts(id) {
    const allUsers = await readAndWrite('read', 'products.json');

    const newAllUsers = allUsers.filter(person => person.id !== id);

    await readAndWrite('write', 'products.json', newAllUsers);

    return newAllUsers;
  }

  async addOrUpdateProducts(id) {
    const allProducts = await readAndWrite('read', 'products.json');
    const isValidPoductId = allProducts.some(product => product.id === id);
    if (isValidPoductId) {
      const filtredProducts = allProducts.filter(product => product.id !== id);
      this.id = id;
      filtredProducts.push(this);
      await readAndWrite('write', 'products.json', filtredProducts);
      return this;
    }
    return false;
  }
}

module.exports = Products;
