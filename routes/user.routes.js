const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const userController = new UserController();

router.get('/info', userController.getUserInfo);
router.get('/', userController.getUser);
router.get('/list', userController.getUserList);
router.get('/:userId', userController.getUserByUserId);
router.put('/', userController.updateUser);
router.patch('/:userId', userController.editUserByUserId);
router.delete('/:userId', userController.deleteUser);


module.exports = router;
