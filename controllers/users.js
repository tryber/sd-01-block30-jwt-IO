const express = require('express');

const router = express.Router();

const rescue = require('../service/rescue');

const User = require('../models/users');

const callBackCreateUser = async (req, res) => {
  const { username, password: swordFish, role } = req.body;
  const users = new User(username, swordFish, role);
  await users.addNewUser().then((body) => {
    const { password, ...user } = body;
    console.log(password);
    res.status(201).json(user);
  });
};

router.post('/users', rescue(callBackCreateUser));

module.exports = router;
