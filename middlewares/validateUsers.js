const fs = require('fs');
const path = require('path');

const roleList = ['funcionario', 'entregador', 'cliente'];
const regex = /^([a-zA-Z0-9]+)$/;

const validateUsers = (user = '') => user.length >= 6 && regex.test(user);

const validatePassword = (pass = '') => pass.length >= 8;

const validateRole = (role = '') => roleList.includes(role);

const userUnique = (username) => {
  const usersRegister = fs.readFileSync(path.resolve(__dirname, '..', 'users.json'), 'utf8')
  const userExists = JSON.parse(usersRegister);
  return userExists.find(user => user.username === username);
}

const userValid = (req, _res) => {
  const { username, password, role } = req.body;
  if (!validateUsers(username) || !validatePassword(password) || validateRole(role))
    return { message: 'data invalid' };
  if (userUnique(username))
    return { message: 'Username not available!' };
}

module.exports = { userValid, userUnique };
