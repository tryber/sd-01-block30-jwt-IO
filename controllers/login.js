const User = require('../models/user');
const jwt = require('jsonwebtoken');

const secret = 'seusecretdetoken';

module.exports = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) return res.send(401);

  const user = await User.findOne({ username, password });

  if (!user) return res.status(401).json({ message: 'Usuário não encontrado' });

  const jwtConfig = {
    expiresIn: '3d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: { username, password } }, secret, jwtConfig);
  res.status(200).json({ token, expires: jwtConfig.expiresIn });
};
