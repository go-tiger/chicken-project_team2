const express = require('express');
const router = express.Router();
const authMWRouter = require('../middlewares/auth');

const UserController = require('../controllers/user.controller');
const userController = new UserController();

router.get('/list', userController.getUsers);
router.get('/list/:id', userController.getOneUser);
router.post('/login', userController.login);
router.post('/signup', userController.register);
router.patch('/:userId', authMWRouter, userController.editUser);
router.delete('/:userId', userController.deleteUsers);
module.exports = router;
