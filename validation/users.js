const { dataExists } = require('../service.js');

async function validateUsername({ username }) {
  const user = await dataExists('users.json', username, 'username');
  return username && !user && /^([a-zA-Z0-9]+){6,}$/.test(username);
}

function validatePassword({ password }) {
  return password && /^.{8,}$/.test(password);
}

function validateRole({ role }) {
  return role && ['funcionario', 'entregador', 'cliente'].includes(role);
}

async function validate(obj) {
  return await validateUsername(obj) && validatePassword(obj) && validateRole(obj);
}

module.exports = { validate };
