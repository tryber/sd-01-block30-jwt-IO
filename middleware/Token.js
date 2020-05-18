
module.exports = async (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'no auth token provided' });
  next()
};

