const { getData, setData } = require('./utils');
const { isValidUser } = require('../controllers/validation/validData');
const { v1: uuidv1 } = require('uuid');

const FILE_NAME = 'users';

const isValidDados = ({ username, password, role }) => {
  if (password < 8) return false;
  const validRoles = ['funcionario', 'entregador', 'cliente'];
  if (!validRoles.includes(role)) return false;
  if (!isValidUser(username)) return false;
  return true;
}

const addUser = async (obj) => {
  const data = await getData(FILE_NAME);
  const objId = { ...obj, id: uuidv1() };
  const newArray = [...data, objId];
  return setData(FILE_NAME, newArray)
}

const findOne = async ({ username, password }) => {
  const data = await getData(FILE_NAME);
  const user = data.find((obj) => (
    obj.username === username && obj.password === password
  ));
  return user || { username, role: user.role };
}

const User = {
  isValidDados,
  save: addUser,
  findOne,
};

module.exports = User;
