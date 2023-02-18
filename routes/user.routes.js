const express = require('express');
const router = express.Router();
const authMWRouter = require('../middlewares/auth');

const UserController = require('../controllers/user.controller');
const userController = new UserController();

router.get('/list', userController.getUsers);
router.post('/login', userController.login);
// router.delete('/logout', userController.logout);
router.post('/signup', userController.register);
router.patch('/', authMWRouter, userController.editUser);
router.delete('/:userId', authMWRouter, userController.deleteUsers);

module.exports = router;
