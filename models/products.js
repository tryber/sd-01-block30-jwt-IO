const readAndWrite = require('../service/readAndWrite');
const { verifyProducts } = require('../service/checkers');
const { v4: uuidv4 } = require('uuid');

class Products {
  constructor(name, description, price, image,) {
    this.id = null;
    this.name = name;
    this.description = description;
    this.price = price;
    this.image = image;
  }

  async getAllProducts() {
    const allUsers = await readAndWrite('read', 'products.json');
    return allUsers.map(product => product);
  }

  async getByIdProducts(id) {
    const allUsers = await readAndWrite('read', 'products.json');
    const oneUser = allUsers.find(person => person.id === parseInt(id));
    return oneUser;
  }

  async addNewProducts(image) {
    const allProducts = await readAndWrite('read', 'products.json');
    if (!verifyProducts(this))
      throw new Error('Valores invalidos! 😱');
    this.id = uuidv4();
    this.image = image;
    allProducts.push(this);
    await readAndWrite('write', 'products.json', allProducts);
    return this;
  }

  async deleteProducts(id) {
    const allUsers = await readAndWrite('read', 'products.json');

    const newAllUsers = allUsers.filter(person => person.id !== parseInt(id));

    await readAndWrite('write', 'products.json', newAllUsers);

    return newAllUsers;
  }

  async addOrUpdateProducts(id) {
    const allUsers = await readAndWrite('read', 'products.json');

    const oneUser = allUsers.find(person => person.id === parseInt(id));

    if (oneUser) {
      this.name = name;
      this.description = description;
      this.price = price;
      this.image = image;
    } else {
      this.id = uuidv4();
      allUsers.push(this);
    }

    await readAndWrite('write', 'products.json', allUsers);
    return allUsers;
  }
}

module.exports = Products;
