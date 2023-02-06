require('dotenv').config();

const express = require('express');
const router = express.Router();

const { signupValidation } = require('../validations');
const { editValidation } = require('../validations');
const { user } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { JWT_SECRET_KET } = process.env;

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

/* 관리자 회원 관리 */
router.get('/users', async (req, res) => {
  try {
    const User = await user.findAll({
      attributes: { exclude: ['password'] },
    });
    res.status(200).json([{ users: User }]);
  } catch (error) {}
});

router.delete('/admin/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const deleteUser = await user.destroy({ where: { id: userId } });
    res.status(200).json({ message: '선택된 회원 탈퇴가 완료되었습니다.' });
  } catch (error) {}
});

router.get('/admin/edit/:userId', async (req, res) => {
  const userId = req.params.userId;
  console.log(userId);
  try {
    const User = await user.findOne({
      attributes: { exclude: ['password'] },
      where: { id: userId },
    });
    //console.log(User);
    res.status(200).json([{ user: User }]);
  } catch (error) {}
});

router.put('/admin/edit/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const { password, phone, address } = await editValidation.validateAsync(
      req.body
    );
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(password, 12);
    const User = await user.update(
      {
        password: hashedPassword,
        phone: phone,
        address: address,
      },
      { where: { id: userId } }
    );
    res.status(202).json({ message: '회원 정보가 수정되었습니다.' });
  } catch (error) {
    if (error.isJoi) {
      return res.status(422).json({ message: error.details[0].message });
    }
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
