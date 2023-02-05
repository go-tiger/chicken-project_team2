require('dotenv').config();

const express = require('express');
const router = express.Router();
const authMWRouter = require('../middlewares/auth');

const { user } = require('../models');
const bcrypt = require('bcrypt');

router.get('/', authMWRouter, async (req, res) => {
  // const userId = req.params.userId;
  const userId = res.locals.user.id;

  try {
    const User = await user.findOne({
      attributes: { exclude: ['password'] },
      where: { id: userId },
    });
    res.status(200).json([{ user: User }]);
  } catch (error) {}
});

router.put('/:userId', async (req, res) => {
  const userId = req.params.userId;
});

router.get('/admin/users', async (req, res) => {
  try {
    const User = await user.findAll({ attributes: { exclude: ['password'] } });
    res.status(200).json(User);
  } catch (error) {}
});

router.delete('/admin/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const deleteUser = await user.destroy({ where: { id: userId } });
    res.status(200).json({ message: '선택된 회원 탈퇴가 완료되었습니다.' });
  } catch (error) {}
});

module.exports = router;
