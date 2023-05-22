const express = require('express');
const router = express.Router();

const authRouter = require('./auth.routes');
const userRouter = require('./user.routes');
const menuRouter = require('./menu.routes');
const cartRouter = require('./cart.routes');
const orderRouter = require('./order.routes');

const authJwt = require('../middlewares/auth');

router.use('/auth', authRouter);
router.use('/user', authJwt, userRouter);
router.use('/menu', authJwt, menuRouter);
// router.use('/cart', authJwt, cartRouter);
// router.use('/order', authJwt, orderRouter);

module.exports = router;
