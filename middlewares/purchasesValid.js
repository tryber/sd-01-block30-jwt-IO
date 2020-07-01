const validateQuantity = ({ quantity }) => {
  return quantity > 0 && Number.isInteger(quantity);
}

const validateUpdate = (obj) => {
  return obj.userID && obj.productId && obj.quantity;
}

const validateBuy = (obj) => {
  return obj.productId && obj.quantity && validateQuantity(obj);
}

module.exports = { validateBuy, validateUpdate };
