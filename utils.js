const rescue = fn => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    res.status(401).json({ message: err.name, error: err.message });
    next(err.name);
  }
};

module.exports = rescue;
