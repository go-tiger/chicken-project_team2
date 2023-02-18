const express = require('express');
const router = express.Router();
const authMWRouter = require('../middlewares/auth');

const AdminController = require('../controllers/admin.controller');
const adminController = new AdminController();

router.get('/userList', authMWRouter, adminController.getAllorder);
router.get('/orderList', authMWRouter, adminController.getAllorder);
router.get('/orderDone', authMWRouter, adminController.getAllorder);
router.get('/itemList', authMWRouter, adminController.getAllorder);

module.exports = router;
