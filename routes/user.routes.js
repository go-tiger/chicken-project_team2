const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const userController = new UserController();

const AdminController = require('../controllers/admin.controller');
const adminController = new AdminController();

// 전체 유저 목록
router.get('/list', userController.getUserList);
// 유저 정보 가져오기
router.get('/info', userController.getUserInfo);
// 내 정보 가져오기
router.get('/', userController.getUser);
// 내 정보 수정
router.put('/', userController.updateUser);
// 회원 삭제
router.delete('/:userId', adminController.deleteUser);

// router.patch('/:userId', authMWRouter, userController.editUser);
// router.delete('/:userId', userController.deleteUsers);

// router.get('/admin/users', async (req, res) => {
//   try {
//     const User = await user.findAll({ attributes: { exclude: ['password'] } });
//     res.status(200).json(User);
//   } catch (error) {
//     res.status(500).json({ message: err.message });
//   }
// });

module.exports = router;
