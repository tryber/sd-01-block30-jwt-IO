// const fs = require('fs').promises;
// const path = require('path');

// class Purchase {
//   constructor(userID, productId, quantity) {
//     this.id = null;
//     this.userID = userID;
//     this.productId = productId;
//     this.quantity = quantity;
//   }

//   async getAll(id) {
//     const rawData = await fs.readFile(path.resolve(__dirname, '..', 'data', 'purchases.json'), 'utf8');
//     const purchases = JSON.parse(rawData)
//       .filter((purchase) => purchase.id === parseInt(id))

//     return purchases;
//   }

//   async getById(id) {
//     const rawData = await fs.readFile(path.resolve(__dirname, '..', 'data', 'purchases.json'), 'utf8');
//     const purchase = JSON.parse(rawData)
//       .find((purchase) => purchase.id === parseInt(id));

//     return purchase;
//   }

//   async add() {
//     const rawData = await fs.readFile(path.resolve(__dirname, '..', 'data', 'products.json'), 'utf8');
//     const products = JSON.parse(rawData);

//     this.id = products[products.length - 1].id + 1
//     products.push(this);

//     await fs.writeFile(path.resolve(__dirname, '..', 'data', 'products.json'),
//       JSON.stringify(products), 'utf8', (err) => {
//         if (err) throw err;
//         console.log('Ocorreu algum erro!');
//       });

//     return this;
//   }

//   async delete(id) {
//     const rawData = await fs.readFile(path.resolve(__dirname, '..', 'data', 'products.json'), 'utf8');
//     const products = JSON.parse(rawData).filter(product => product.id !== parseInt(id));

//     await fs.writeFile(path.resolve(__dirname, '..', 'data', 'products.json'),
//       JSON.stringify(products), 'utf8', (err) => {
//         if (err) throw err;
//         console.log('Ocorreu algum erro!');
//       });

//     return products;
//   }

//   async addOrUpdate(id) {
//     const rawData = await fs.readFile(path.resolve(__dirname, '..', 'data', 'products.json'), 'utf8');
//     const products = JSON.parse(rawData);

//     const product = products.find(product => product.id === parseInt(id));

//     if (product) {
//       product.name = this.name;
//       product.description = this.description;
//       product.price = this.price;
//     } else {
//       this.id = products[products.length - 1].id + 1;
//       products.push(this);
//     }

//     await fs.writeFile(path.resolve(__dirname, '..', 'data', 'products.json'),
//       JSON.stringify(products), 'utf8', (err) => {
//         if (err) throw err;
//         console.log('Ocorreu algum erro!');
//       });

//     return products;
//   }
// }

// module.exports = Product;
