const { getFile } = require('../service.js');

const findUser = async username => {
  const users = await getFile('users.json');
  const hasUser = users.some(user => user.username === username);
  return hasUser;
}

async function validateUsername({ username }) {
  const user = await findUser(username);
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
