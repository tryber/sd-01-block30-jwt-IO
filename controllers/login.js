const express = require('express')

const router = express.Router();

const rescue = require('../service/rescue')

const Login = require('../models/login');

const jwt = require('jsonwebtoken');

const moment = require('moment');

const callBackDoLogin = async (req, res) => {
  const { username, password } = req.body;
  const loginUser = new Login(username, password);
  if (!username || !password)
    return res.status(417).json({ message: 'Expectation Failed' });
  const listUsers = await loginUser.findOne(username);
  const jwtConfig = {
    expiresIn: '3d',
    algorithm: 'HS256',
  };
  const secret = 'doug'
  const token = jwt.sign({ data: listUsers }, secret, jwtConfig);
  const { exp } = jwt.verify(token, secret);
  const expires = moment.unix(exp).format();
  res.status(200).json({ token, expires });
};


router.post('/login', rescue(callBackDoLogin));

module.exports = router
