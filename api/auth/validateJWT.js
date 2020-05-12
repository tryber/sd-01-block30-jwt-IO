const jwt = require('jsonwebtoken');
const User = require('../../models/user');

const segredo = 'seusecretdetoken';

module.exports = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    res.status(401).json({ error: 'Token não encontrado ou informado' });
  }

  try {
    const decoded = jwt.verify(token, segredo);

    const user = await User.findOne({ _id: decoded.data._id });

    if (!user) {
      res.status(401).json({ message: 'Erro ao procurar usuario do token.' });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};
