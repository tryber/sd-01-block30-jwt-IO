const { modifyFile, readFileJson } = require('../modifyFile');

class Image {
  constructor(image) {
    this.image = image;
  }

  async update(productId) {
    const images = await readFileJson('products');
    const image = images.find(({ id }) => id === productId);

    image.image = this.image;

    await modifyFile(images, 'products');

    return image.image;
  }
}

module.exports = Image;
