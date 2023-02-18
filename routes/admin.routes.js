const express = require('express');
const router = express.Router();
const authMWRouter = require('../middlewares/auth');

const AdminController = require('../controllers/admin.controller');
const adminController = new AdminController();

router.get('/order', authMWRouter, adminController.getAllorder);

module.exports = router;
