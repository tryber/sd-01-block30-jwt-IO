const express = require('express');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

const { loginValidMiddleware, isLoginTrue } = require('../middlewares/loginValid');

const router = express.Router();

router.use(loginValidMiddleware);

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  const { role } = await isLoginTrue(username, password);

  const payload = { username, role };

  const jwtConfig = {
    expiresIn: '3d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ payload }, secret, jwtConfig);
  res.status(200).json({ token });
});

module.exports = router;
