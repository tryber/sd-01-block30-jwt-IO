const readAndWrite = require('../service/readAndWrite');

class Images {
  constructor(images) {
    this.images = images;
  }

  async createImage(productId) {
    const products = await readAndWrite('read', 'products.json');
    const img = products.find(({ id }) => id === productId);
    img.image = this.images;
    // const returnImage = (img) => `http://localhost:8080/${img}`
    return img.image;
  }
}

module.exports = Images;
