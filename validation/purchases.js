function validateUpdate(obj) {
  if (obj.userID && obj.productId && obj.quantity) return true;
}

function validateBuy(obj) {
  if (obj.productId && obj.quantity) return true;
  return false;
}

module.exports = { validateBuy, validateUpdate };
