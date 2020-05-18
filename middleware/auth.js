const jwt = require('jsonwebtoken');
const User = require('../models/user');

const factory = secret => async (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    const payload = jwt.verify(token, secret);

    const user = await User.findOneById(payload.data);

    if (!user) return res.status(401).json({ message: 'invalid token user' });

    req.user = user;

    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  factory,
};
