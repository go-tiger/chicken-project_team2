const express = require('express');
const router = express.Router();

const userRouter = require('./user.routes');
const menuRouter = require('./menu.routes');
const mycartRouter = require('./mycart.routes');
const orderRouter = require('./order.routes');
const mypageRouter = require('./mypage.routes');

router.use('/user', userRouter);
router.use('/menu', menuRouter);
router.use('/cart', mycartRouter);
router.use('/order', orderRouter);
router.use('/mypage', mypageRouter);

module.exports = router;
