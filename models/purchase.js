const { getData, setData, addItem } = require('./utils');


const FILE_NAME = 'purchase';
const FILE_PRODUCT = 'products';
const FILE_USER = 'users';

const findOne = async (id) => {
  const purchases = await getData(FILE_NAME);
  const onePurchase = purchases
    .find((purchase) => purchase.id === id);
  if (!onePurchase) return false;
  return onePurchase;
};

const isExists = async (id, type) => {
  const data = await getData(type);
  return data.some(obj => obj.id === id);
};

const isValidQuantity = (quantity) => (
  quantity > 0 && typeof quantity === 'number' && Number.isInteger(quantity)
);

const validUpdate = ({ userID }) => {
  if (!userID) return false;
  if (!isExists(userID, FILE_USER)) return false;
  return true;
};

const validPurchase = ({ productId, quantity }) => {
  if (!productId || !quantity) return false;
  if (!isValidQuantity(quantity)) return false;
  if (!isExists(productId, FILE_PRODUCT)) return false;
  return true;
};
const deletePurchase = async (id) => {
  const searchPurchase = findOne(id);
  if (!searchPurchase) return false;
  const purchases = await getData(FILE_NAME);
  const newArray = purchases.filter(purchase => (
    searchPurchase.id !== purchase.id
  ));
  await setData(FILE_NAME, newArray);
  return newArray;
};

const updatePurchase = async (obj, id) => {
  const searchPurchase = await findOne(id);
  if (!searchPurchase) return false;
  const newArray = [...deletePurchase(id), { ...obj, id: searchPurchase.id }];
  await setData(FILE_NAME, newArray);
  return { ...obj, id: searchPurchase.id };
};

const verifyUserPurchase = async (userID, id) => {
  const data = await getData(FILE_NAME);
  const onePurchase = data.find(purchase => purchase.id === id);
  if (!onePurchase) return false;
  return (onePurchase.userID === userID);
};

const getPurchase = async (userID, id) => {
  const data = await getData(FILE_NAME);
  return data.filter(purchase => purchase.userID === userID)
    .find(purchaseUser => purchaseUser.id === id);
};

const getAllPurchase = async (userID) => {
  const data = await getData(FILE_NAME);
  return data.filter(purchase => purchase.userID === userID);
};

const Purchase = {
  validPurchase,
  validUpdate,
  delete: deletePurchase,
  update: updatePurchase,
  save: addItem,
  getAll: getAllPurchase,
  getOne: getPurchase,
  verifyUser: verifyUserPurchase,
};

module.exports = Purchase;
