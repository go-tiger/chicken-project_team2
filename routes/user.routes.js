const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const userController = new UserController();

router.get('/list', userController.getUsers);
router.post('/login', userController.login);
// router.delete('/logout', userController.logout);
router.post('/signup', userController.register);
router.put('/:userId', userController.editUsers);
router.delete('/:userId', userController.deleteUsers);

module.exports = router;
