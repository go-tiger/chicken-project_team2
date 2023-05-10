const express = require('express');
const router = express.Router();

const userRouter = require('./user.routes');
const menuRouter = require('./menu.routes');
const cartRouter = require('./cart.routes');
const orderRouter = require('./order.routes');

router.use('/user', userRouter);
// router.use('/menu', menuRouter);
// router.use('/cart', cartRouter);
// router.use('/order', orderRouter);

module.exports = router;
