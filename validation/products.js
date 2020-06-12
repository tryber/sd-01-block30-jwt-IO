function validateName({ name }) {
  if (name && /[0-9a-zA-Z]{5,}/.test(name)) return true;
  return false;
}

function validatePrice({ price }) {
  if (price && typeof price === 'number' && price > 0) return true;
  return false;
}

function validate(obj) {
  if (validateName(obj) && validatePrice(obj) && obj.description) return true;
  return false;
}

module.exports = { validate };
