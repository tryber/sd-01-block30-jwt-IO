const readAndWrite = require('../service/readAndWrite');
// const { verifyProducts } = require('../service/checkers');
const { v4: uuidv4 } = require('uuid');

class Purchases {
  constructor(userID, productId, quantity) {
    this.id = null;
    this.userID = userID;
    this.productId = productId;
    this.quantity = quantity;
  }

  async addPurchase(idProduct) {
    const products = await readAndWrite('read', 'products.json');
    const oneProduct = products.find(product => product.id === idProduct);
    if (!oneProduct) throw new Error('Something broke! 😱');
    const purchases = await readAndWrite('read', 'purchases.json');
    this.id = uuidv4();
    purchases.push({
      id: this.id,
      userID: this.userID,
      productId: this.productId,
      quantity: this.quantity,
    });
    await readAndWrite('write', 'purchases.json', purchases);

    return this;
  }

  //   static async getByIdProducts(id) {
  //     const allUsers = await readAndWrite('read', 'products.json');
  //     return allUsers.find(person => person.id === id);
  //   }

  //   async addNewProducts(image) {
  //     const allProducts = await readAndWrite('read', 'products.json');
  //     if (!verifyProducts(this)) throw new Error('Valores invalidos! 😱');
  //     this.id = uuidv4();
  //     this.image = image;
  //     allProducts.push(this);
  //     await readAndWrite('write', 'products.json', allProducts);
  //     return this;
  //   }

  //   static async deleteProducts(id) {
  //     const allUsers = await readAndWrite('read', 'products.json');

  //     const newAllUsers = allUsers.filter(person => person.id !== id);

  //     await readAndWrite('write', 'products.json', newAllUsers);

  //     return newAllUsers;
  //   }

    async editProductCart(userID) {
      const allProducts = await readAndWrite('read', 'purchases.json');
      const isValidPoductId = allProducts.filter(product => product.userID === userID)
      if (!isValidPoductId) throw new Error('Something broke! 😱');
      return isValidPoductId;
    }

    // async editProductCart() {
    //   const allProducts = await readAndWrite('read', 'purchases.json');
    //   const isValidPoductId = allProducts.some(product => product.id === id)
    //   if (!isValidPoductId) throw new Error('Something broke! 😱');
    //   return isValidPoductId;
    // }
}

module.exports = Purchases;
