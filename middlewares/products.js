const jwt = require('jsonwebtoken');
const User = require('../models/users');

async function validateToken(req, res, next) {
  const { username, password, role } = req.body;
  const secret = 'doug';
  try {
    const token = req.headers.authorization;
    const payload = jwt.verify(token, secret);
    const users = new User(username, password, role);
    const user = await users.getById(payload.data.id);
    if (!user || payload.data.role !== 'funcionario') return res.status(401).json({ message: 'Não autorizado' });
    req.user = payload; 
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = validateToken;
