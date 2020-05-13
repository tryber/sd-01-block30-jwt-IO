const express = require('express');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const { loginValidMiddleware, isLoginTrue } = require('../middlewares/loginValid');

const router = express.Router();

router.use(loginValidMiddleware);

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  const { role } = await isLoginTrue(username, password);

  const expires = moment().add(3, 'days').valueOf() - Date.now();
  const payload = { username, role }

  const jwtConfig = {
    expiresIn: '3d',
    algorithm: 'HS256',
  }

  const token = jwt.sign({ payload }, password, jwtConfig);
  res.status(200).json({ token, expires });
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
