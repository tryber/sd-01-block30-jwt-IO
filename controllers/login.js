const express = require('express');
const jwt = require('jsonwebtoken');

const { loginValidMiddleware } = require('../middlewares/loginValid');

const router = express.Router();
// router.use(loginValidMiddleware);

router.post('/', (req, res) => {
  const { username, password } = req.body;

  const jwtConfig = {
    expiresIn: '15m',
    algorithm: 'HS256',
  }

  const token = jwt.sign({ username }, password, jwtConfig);
  res.status(200).json({ token, expires: jwtConfig.expiresIn });
});

module.exports = router;

// const User = require('../models/user');

// module.exports = async (req, res) => {
//   const username = req.body.username;
//   const password = req.body.password;

//   if (!username || !password) return res.send(401);

//   const user = await User.findOne({ username });

//   if (!user) res.status(401).json(false);

//   res.status(200).json(true);
// };
