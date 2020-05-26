const { getData, addItem } = require('./utils');

const FILE_NAME = 'users';

const isUniqueUser = async (username) => {
  const data = await getData('users');
  return !data.some(user => user.username === username);
};

const isValidUser = (username) => {
  const usernameRegex = /^[a-z0-9_-]{8,30}$/g;
  return username.match(usernameRegex)
    && username.length >= 6;
};

const isValidDados = ({ username, password, role }) => {
  if (password.length < 8) return false;
  const validRoles = ['funcionario', 'entregador', 'cliente'];
  if (!validRoles.includes(role)) return false;
  if (!isValidUser(username)) return false;
  return true;
};

const findOne = async ({ username, password }) => {
  const data = await getData(FILE_NAME);
  const user = data.find(obj => (
    obj.username === username && obj.password === password
  ));
  if (!user) return false;
  const { role, id } = user;
  return { username, role, id };
};

const findOneById = async ({ id }) => {
  const data = await getData(FILE_NAME);
  const user = data.find(obj => (
    obj.id === id
  ));
  if (!user) return false;
  const { username, role } = user;
  return { username, role, id };
};

const User = {
  isValidDados,
  save: addItem,
  findOne,
  findOneById,
  isUniqueUser,
};

module.exports = User;
