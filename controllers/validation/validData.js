const { getData } = require('../../models/utils');

const isValidUser = (username) => {
  const usernameRegex = /[a-z0-9]*[A-Z0-9]*/g;
  return username.match(usernameRegex)
    && username.length >= 6;
}

const isUniqueUser = async (username) => {
  const data = await getData('users');
  return !data.find((user) => user.username === username);
}

module.exports = {
  isValidUser,
  isUniqueUser,
}
