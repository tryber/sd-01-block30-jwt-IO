const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const secret = 'project30';
  try {
    const token = req.headers.authorization;
    const payload = jwt.verify(token, secret);

    if (!payload) return res.status(401).json({ message: 'Token inválido!' });
    req.user = payload;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
