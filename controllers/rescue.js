module.exports = fn => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    res.status(500).send('<h1>SHOW</h1>');
  }
};
