const jwt = require('jsonwebtoken');

const secret = 'project30';

module.exports = (username, role, id) => {
  const jwtConfig = {
    expiresIn: '3d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ username, role, id }, secret, jwtConfig);
  return token;
};
