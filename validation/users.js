const users = require('../users.json');

const findUser = username => users.find(user => user.username === username);

function validateUsername({ username }) {
  if (username && !findUser(username) && /^([a-zA-Z0-9]+)$/.test(username))
    return true;
  return false;
}

function validatePassword({ password }) {
  if (password && /^.{8,}$/.test(password)) return true;
  return false;
}

function validateRole({ role }) {
  if (role && ['funcionario', 'entregador', 'cliente'].includes(role))
    return true;
  return false;
}

function validate(obj) {
  if (validateUsername(obj) && validatePassword(obj) && validateRole(obj))
    return true;
  return false;
}

module.exports = { validate };
