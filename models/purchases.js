const readAndWrite = require('../service/readAndWrite');
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

  static async getByIdPurchase(idClient, idPurchase) {
    const onePurchase = await readAndWrite('read', 'purchases.json');
    if (!onePurchase) throw new Error('Something broke! 😱');
    const purchases = onePurchase.filter(({ userID }) => userID === idClient);
    return purchases.find(({ id }) => id === idPurchase);
  }

  static async getAllPurchases(idClient) {
    const allPurchases = await readAndWrite('read', 'purchases.json');
    const purchases = allPurchases.filter(({ userID }) => userID === idClient);
    if (!purchases) throw new Error('Something broke! 😱');
    return purchases;
  }

  static async deletePurchases(idClient, idPurchase) {
    const onePurchase = await readAndWrite('read', 'purchases.json');
    if (!onePurchase) throw new Error('Something broke! 😱');
    const newPurchases = onePurchase.find(
      ({ id, userID }) => id === idPurchase && userID === idClient,
    );
    const newOnePurchases = onePurchase.filter(
      element => element !== newPurchases,
    );
    await readAndWrite('write', 'purchases.json', newOnePurchases);
    return newPurchases;
  }

  async editProductCart(idPurchase) {
    const allPurchases = await readAndWrite('read', 'purchases.json');
    const purchase = allPurchases.filter(({ id }) => id !== idPurchase);
    if (!purchase) throw new Error('Something broke! 😱');
    const newPurchase = {
      id: idPurchase,
      userID: this.userID,
      productId: this.productId,
      quantity: this.quantity,
    };
    purchase.push(newPurchase);
    await readAndWrite('write', 'purchases.json', purchase);
    return newPurchase;
  }
}

module.exports = Purchases;
