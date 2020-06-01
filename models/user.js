const utils = require('./utils');

const roleList = ['entregador', 'funcionario', 'cliente'];
const validUsernameRegex = /^[a-zA-Z0-9]{6,}$/g;

async function validateUser(username, password, role) {
  const usersData = await utils.getData('users');
  const uniqueUsername = usersData.some(userDetails => userDetails.username === username);
  if (uniqueUsername) return false;
  if (!roleList.includes(role)) return false;
  if (username.length < 6 || password.length < 8 || !username.match(validUsernameRegex))
    return false;
  return true;
}

async function userLogin({ username, password }) {
  const usersData = await utils.getData('users');
  const user = usersData.find(user => user.username === username && user.password === password);
  if (user) return { username: user.username, role: user.role };
  return false;
}

async function findByUsername({ username }) {
  const usersData = await utils.getData('users');
  const user = usersData.find(user => user.username === username);
  return user;
}

async function validateRole({ role }) {
  return role === 'funcionario';
}

const User = {
  save: (userData) => {
    utils.addItem('users', userData);
    return Promise.resolve(userData);
  },
  validate: validateUser,
  userLogin,
  findByUsername,
  validateRole,
};

module.exports = User;
