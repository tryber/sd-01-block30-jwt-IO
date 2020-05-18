const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const rescue = require('../rescue');

const login = secret => async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) return res.status(422).json({ message: 'Faltou algum campo' });

  const user = await User.findOne({ username, password });
  if (!user) res.status(401).json({ message: 'Inválido' });

  const jwtConfig = {
    expiresIn: '3d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: user }, secret, jwtConfig);

  res.status(200).json({
    token,
  });
};

module.exports = secret => rescue(login(secret));
