const express = require('express');
const router = express.Router();
const authMWRouter = require('../middlewares/auth');

const OrderController = require('../controllers/order.controller');
const orderController = new OrderController();

router.get('/orders', orderController.getOrderList);
router.post('/now/:menuId', orderController.addOrderByMenuId);
router.post('/', orderController.addOrder);
router.put('/update/:orderId', orderController.acceptOrderByOrderId);
router.put('/done/:orderId', orderController.completeOrder);
router.put('/refuse/:orderId', orderController.rejectOrder);
router.delete('/delete/:orderId', orderController.deleteOrder);

module.exports = router;
