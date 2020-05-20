const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const rescue = require('../rescue');
const moment = require('moment');

const login = secret => async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) return res.status(422).json({ message: 'Faltou algum campo' });

  const user = await User.findOne({ username, password });
  if (!user) res.status(401).json({ message: 'Inválido' });

  const jwtConfig = {
    expiresIn: '3d',
    algorithm: 'HS256',
  };
  const date = new Date(0);

  const token = jwt.sign({ data: user }, secret, jwtConfig);
  const { exp } = jwt.verify(token, secret);

  const expires = moment(date.setUTCSeconds(exp)).format();
  res.status(200).json({
    token,
    expires,
  });
};

module.exports = secret => rescue(login(secret));
