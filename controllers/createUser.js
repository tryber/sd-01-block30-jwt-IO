const express = require('express');

const router = express.Router();

const validCreateUserMiddleware = require('../middlewares/createUser');

router.post('/', validCreateUserMiddleware, (_req, res) => {
  res.status(201).json({ message: 'User successfully registered' });
});

module.exports = { router };
