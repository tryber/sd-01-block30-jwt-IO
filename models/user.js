const utils = require('./utils');

const roleList = ['entregador', 'funcionario', 'cliente'];
const validUsernameRegex = /^[a-zA-Z0-9]{6,}$/g;

async function validateUser(username, password, role) {
  const usersList = await utils.getData('users');
  const uniqueUsername = usersList.some(userDetails => userDetails.username === username);
  if (uniqueUsername) return false;
  if (!roleList.includes(role)) return false;
  if (username.length < 6 || password.length < 8 || !username.match(validUsernameRegex))
    return false;
  return true;
}

async function userLogin({ username, password }) {
  const usersList = await utils.getData('users');
  const userData = usersList.find(user => user.username === username && user.password === password);
  if (userData) return { id: userData.id, username: userData.username, role: userData.role };
  return false;
}

async function findById({ id }) {
  const usersList = await utils.getData('users');
  const userData = usersList.find(user => user.id === id);
  if (userData) return userData;
  return false;
}

async function findByUsername({ username }) {
  const usersList = await utils.getData('users');
  const userData = usersList.find(user => user.username === username);
  return userData;
}

async function validateRole({ role }) {
  return role === 'funcionario';
}

const User = {
  save: (userData) => {
    utils.addItemWithId('users', userData);
    return Promise.resolve(userData);
  },
  validate: validateUser,
  userLogin,
  findById,
  findByUsername,
  validateRole,
};

module.exports = User;
