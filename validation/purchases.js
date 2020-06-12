function validateQuantity({ quantity }) {
  return quantity > 0 && Number.isInteger(quantity);
}

function validateUpdate(obj) {
  return obj.userID && obj.productId && obj.quantity;
}

function validateBuy(obj) {
  return obj.productId && obj.quantity && validateQuantity(obj);
}

module.exports = { validateBuy, validateUpdate };
