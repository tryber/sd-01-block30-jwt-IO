const rescue = fn => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (e) {
    res.json({ message: e.message })
    next(e);
  }
};

module.exports = rescue;
