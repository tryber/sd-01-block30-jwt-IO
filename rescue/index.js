module.exports = fn => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (e) {
    res.status(500).json({ message: e.name, error: e.message });
    next(e);
  }
};
