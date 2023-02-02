require('dotenv').config();

const express = require('express');
const router = express.Router();

const { user } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { JWT_SECRET_KET } = process.env;

router.post('/login', async (req, res) => {
  const { userName, password } = req.body;

  try {
    const User = await user.findOne({ userName, raw: true });

    const inPasswordCorrect = await bcrypt.compare(password, User.password);

    if (!User || !inPasswordCorrect) {
      return res.status(400).json({ message: '테스트' });
    }

    res.json({ token: jwt.sign({ userName }, JWT_SECRET_KET) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
