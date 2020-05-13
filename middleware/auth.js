const jwt = require('jsonwebtoken')
const User = require('../models/user')

function removePassword ({ password, ...user }) {
  return user
}

module.exports = (secret) => async (req, res, next) => {
  const token = req.headers['authorization']

  if (!token) {
    return res.status(401).json({ message: 'no auth token provided' })
  }

  try {
    const payload = jwt.verify(token, secret)

    const user = await User.findOne({ _id: payload.data._id })

    if (!user) {
      return res.status(401).json({ message: 'invalid token user' })
    }

    req.user = removePassword(user.toObject())

    next()
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
