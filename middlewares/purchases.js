const jwt = require('jsonwebtoken');
async function validateTokenPurchases(req, res, next) {
  const secret = 'doug';
  try {
    const token = req.headers.authorization;
    const payload = jwt.verify(token, secret);
    req.user = payload;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = validateTokenPurchases;
