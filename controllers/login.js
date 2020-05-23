const express = require('express');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const { secret } = require('../config');
const { loginValidMiddleware, isLoginTrue } = require('../middlewares/loginValid');

const router = express.Router();

router.use(loginValidMiddleware);

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  const { role, id } = await isLoginTrue(username, password);

  const expires = new Date(moment().add(3, 'days').valueOf());
  const payload = { username, role, id };

  const jwtConfig = {
    expiresIn: '3d',
    algorithm: 'HS256',
  };

  const token = jwt.sign(payload, secret, jwtConfig);
  res.status(200).json({ token, expires });
});

module.exports = router;
