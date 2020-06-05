const express = require('express')

const router = express.Router();

const rescue = require('../service/rescue')

const User = require('../models/users');

const callBackCreateUser = async (req, res) => {
const { username, password, role } = req.body
const user = new User(username, password, role)
  await user.addNewUser().then((body) => {
    const { password, ...user} = body
    res.status(201).json(user);
  })
};

router.post('/users', rescue(callBackCreateUser));

module.exports = router

