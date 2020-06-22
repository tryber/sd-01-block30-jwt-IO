const express = require('express');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { secret } = require('../secret');

const router = express.Router();

const { validLoginMiddleware, verifyUserExists } = require('../middlewares/login');

router.post('/', validLoginMiddleware, async (req, res) => {
  const { username, password } = req.body;
  const { role, id } = await verifyUserExists(username, password);

  const expires = new Date(moment().add(3, 'days').valueOf());

  const jwtConfig = {
    expiresIn: '3d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ username, role, id }, secret, jwtConfig);

  res.status(201).json({ token, expires });
});

module.exports = router;
