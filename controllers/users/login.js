const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const secret = 'abc';

module.exports = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) return res.status(422).json({ message: 'Campos vazios!' });

  const user = await User.userLogin({ username, password });

  if (!user) return res.status(401).json({ message: 'Usuário não encontrado' });

  const jwtConfig = {
    expiresIn: '3d',
    algorithm: 'HS256',
  };

  const token = jwt.sign(user , secret, jwtConfig);
  const { exp } = jwt.verify(token, secret);
  const expires = moment.unix(exp).format();

  res.status(200).json({ token, expires });
};
