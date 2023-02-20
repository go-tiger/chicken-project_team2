const express = require('express');
const router = express.Router();
const authMWRouter = require('../middlewares/auth');

const AdminController = require('../controllers/admin.controller');
const adminController = new AdminController();

router.get('/userList', adminController.getUserList);
router.delete('/:userId', adminController.deleteUser);
router.get('/orderList', adminController.getOrderList);
router.get('/orderDone', adminController.getOrderDone);
router.get('/itemList', adminController.getItemList);
router.post('/', adminController.updateItem);

module.exports = router;
