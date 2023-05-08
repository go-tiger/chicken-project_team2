const express = require('express');
const router = express.Router();
const authMWRouter = require('../middlewares/auth');

const OrderController = require('../controllers/order.controller');
const orderController = new OrderController();

router.get('/', orderController.getOrderList);
router.post('/now/:menuId', authMWRouter,orderController.addOrderByMenuId);
router.post('/', authMWRouter,orderController.addOrder);
router.put('/update/:orderId', orderController.acceptOrderByOrderId);
router.put('/done/:orderId', orderController.completeOrder);
router.put('/refuse/:orderId', orderController.rejectOrder);
router.delete('/delete/:orderId', orderController.deleteOrder);

module.exports = router;
