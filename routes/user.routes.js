require('dotenv').config();

const express = require('express');
const router = express.Router();

const { signupValidation } = require('../validations');
const { user } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { JWT_SECRET_KET } = process.env;

/* 나중에 삭제할 예정 전체 유저정보 확인해볼 목적으로 만들어둠 */
router.get('/users', async (req, res) => {
  try {
    const User = await user.findAll({
      attributes: { exclude: ['password'] },
    });
    res.json(User);
  } catch (error) {}
});

/* 로그인 API */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const User = await user.findOne({ where: { email }, raw: true });
    const inPasswordCorrect = await bcrypt.compare(password, User.password);

    if (!User || !inPasswordCorrect) {
      return res
        .status(400)
        .json({ message: '이메일이나 비밀번호가 틀렸습니다!.' });
    }

    const userId = await User['id'];

    const accessToken = jwt.sign(
      {
        userId: User['id'],
        userName: User['userName'],
        email: User['email'],
        phone: User['phone'],
        address: User['address'],
        userType: User['userType'],
      },
      JWT_SECRET_KET,
      { expiresIn: '1d' }
    );
    res.cookie('accessToken', accessToken);
    res.json({ token: jwt.sign({ userId }, JWT_SECRET_KET) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* 회원가입 API */
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

    res.status(201).json({ message: '회원가입 완료되었습니다.' });
  } catch (error) {
    if (error.isJoi) {
      return res.status(422).json({ message: error.details[0].message });
    }
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
