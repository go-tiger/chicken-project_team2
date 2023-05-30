const express = require('express');
const router = express.Router();

const OrderController = require('../controllers/order.controller');
const orderController = new OrderController();

router.get('/', orderController.getUserOrders);
router.get('/list', orderController.getOrderList);
router.get('/:menuId', orderController.getUserAndMenu);
router.post('/',orderController.addToOrder);
router.post('/:menuId',orderController.quickOrder);
router.patch('/:orderId',orderController.updateOrderStatus);
router.delete('/:orderId', orderController.deleteOrder);

module.exports = router;
