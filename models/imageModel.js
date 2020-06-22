const { writeFileJson, readFileJson } = require('../fs-functions');

class Image {
  constructor(image) {
    this.image = image;
  }

  async increase(productId) {
    const images = await readFileJson('products');
    const image = images.find(({ id }) => id === productId);
    image.image = this.image;
    await writeFileJson(images, 'products');
    return image.image;
  }
}

module.exports = Image;
