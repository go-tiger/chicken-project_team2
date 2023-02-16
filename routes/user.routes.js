const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const userController = new UserController();

router.post('/signup', userController.register);
router.get('/', userController.getUsers);
router.delete('/');

/* 로그아웃 */
router.delete('/logout', authMWRouter, async (req, res) => {
  return res
    .status(200)
    .clearCookie('accessToken')
    .json({ message: '성공적으로 로그아웃 되었습니다.' });
});

module.exports = router;
