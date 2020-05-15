module.exports = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ message: err.message, trace: err.stack });
  }
}
