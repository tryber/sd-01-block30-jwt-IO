const Login = require('../models/login');
const jwt = require('jsonwebtoken');
const moment = require('moment');

module.exports = async (req, res) => {
  const { username, password } = req.body;

  const loginUser = new Login(username, password);

  if (!username || !password) return res.status(417).json({ message: 'Expectation Failed' });

  const listUsers = await loginUser.findOne()

  const expires = moment().add(3, 'days').valueOf();

  const jwtConfig = {
    expiresIn: expires,
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: listUsers }, secret, jwtConfig);
  // if (!listUsers) res.status(401).json({ message: 'Expectation Failed' });
  return res.status(200).json({ token, expires });
};
