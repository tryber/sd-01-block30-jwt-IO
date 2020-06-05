const rescue = fn => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (e) {
    res.status(500).json({ message: e.message });
    next(e);
  }
};

module.exports = rescue;
