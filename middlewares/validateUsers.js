const fs = require('fs');
const path = require('path');

const roleList = ['funcionario', 'entregador', 'cliente'];
const regex = /^([a-zA-Z0-9]+)$/;


const validateUsers = (user = '') => {
  return user.length >= 6 && regex.test(user);
}

const validatePassword = (pass = '') => {
  return pass.length >= 8;
}

const validateRole = (role = '') => {
  return roleList.includes(role);
}

const userUnique = (user) => {
  const usersRegister = fs.readFileSync(path.resolve(__dirname, '..', 'users.json'), 'utf8')
  const userExists = JSON.parse(usersRegister);
  console.log('userExist', userExists.find(user => user.username === username))
  return userExists.find(user => user.username === username);
}

const userValid = (req, res, next) => {
  const { username, password, role } = req.body;
  if (!validateUsers(username) || !validatePassword(password) || validateRole(role))
    return { message: 'data invalid' };
  if (userUnique(username))
    return { message: 'Username not available!' };
}

module.exports = { userValid, userUnique };