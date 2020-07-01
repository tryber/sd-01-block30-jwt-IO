const validateQuantity = ({ quantity }) => quantity > 0 && Number.isInteger(quantity);


const validateUpdate = obj => obj.userID && obj.productId && obj.quantity;

const validateBuy = obj => obj.productId && obj.quantity && validateQuantity(obj);

module.exports = { validateBuy, validateUpdate };
