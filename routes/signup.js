require('dotenv').config();

const express = require('express');
const router = express.Router();

const { signupValidation } = require('../validations');
const { user } = require('../models');
const bcrypt = require('bcrypt');

const { JWT_SECRET_KET } = process.env;

router.get('/users', async (req, res) => {
  try {
    const User = await user.findAll({
      attributes: { exclude: ['password'] },
    });
    res.json(User);
  } catch (error) {}
});

router.post('/signup', async (req, res) => {
  try {
    const { userName, password, email, phone, address, userType } =
      await signupValidation.validateAsync(req.body);
    const hashedPassword = await bcrypt.hash(password, 12);
    const User = await user.create({
      userName,
      password: hashedPassword,
      email,
      phone,
      address,
      userType,
    });

    res.json(User);
  } catch (error) {
    if (error.isJoi) {
      return res.status(422).json({ message: error.details[0].message });
    }

    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
