const jwt = require('jsonwebtoken');
const Login = require('../../models/login');

const segredo = 'seusecretdetoken';

module.exports = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    res.status(400).json({ error: 'Token não encontrado ou informado' });
  }

  try {
    const decoded = jwt.verify(token, segredo);

    console.log('decoded', decoded);

    if (decoded.exp <= Date.now()) {
      res
        .status(200)
        .json(400, { error: 'Acesso expirado. Faça login novamente' });
    }

    const user = await Login.findOne({ _id: decoded.data._id });

    if (!user) {
      res.status(401).json({ message: 'Erro ao procurar usuario do token.' });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Erro: Seu token é inválido' });
  }
};
