const utils = require('./utils');

const validateRole = ['entregador', 'funcionario', 'cliente'];
const validUsernameRegex = /^[a-zA-Z0-9]{6,}$/g;

async function validateUser(username, password, role) {
  const usersData = await utils.getData('users');
  const uniqueUsername = usersData.some(userDetails => userDetails.username === username);
  if (uniqueUsername) return false;
  if (username.length < 6) return false;
  if (password.length < 8) return false;
  if (!validateRole.includes(role)) return false;
  if (!username.match(validUsernameRegex)) return false;
  return true;
}

const User = {
  save: (userData) => {
    utils.addItem('users', userData);
    return Promise.resolve(userData);
  },
  validate: validateUser,
};

module.exports = User;
