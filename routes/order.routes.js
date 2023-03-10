const express = require('express');
const router = express.Router();

const authMWRouter = require('../middlewares/auth');
const { user, order, myCart, orderList, chickenMenu } = require('../models');

/* 오더 목록(사장님) API 시작 */
router.get('/owner', async (req, res) => {
  try {
    const orders = await orderList.findAll({
      include: [
        {
          model: order,
          attributes: ['address', 'memo', 'orderStatus'],
          include: [
            {
              model: user,
              attributes: ['email', 'phone'],
            },
          ],
        },
      ],
      attributes: {
        exclude: ['id', 'createdAt', 'updatedAt', 'userId'],
      },
    });

    for (let i = 0; i < orders.length; i++) {
      let menuId = orders[i]['menuId'];
      const menu = await chickenMenu.findOne({
        where: { id: menuId },
        raw: true,
      });
      orders[i]['dataValues'].menuName = menu['menuName'];
    }

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});
/* 오더 목록(사장님) API 끝 */

/* 오더 목록(관리자) API 시작 */
router.get('/admin', async (req, res) => {
  try {
    const orders = await orderList.findAll({
      include: [
        {
          model: order,
          attributes: ['address', 'memo', 'orderStatus'],
          include: [
            {
              model: user,
              attributes: ['email', 'phone'],
            },
          ],
        },
      ],
      attributes: {
        exclude: ['id', 'createdAt', 'updatedAt', 'userId'],
      },
    });

    for (let i = 0; i < orders.length; i++) {
      let menuId = orders[i]['menuId'];
      const menu = await chickenMenu.findOne({
        where: { id: menuId },
        raw: true,
      });
      orders[i]['dataValues'].menuName = menu['menuName'];
    }

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});
/* 오더 목록(관리자) API 끝 */

/* 오더 목록(손님) API 시작 */
router.get('/', authMWRouter, async (req, res) => {
  const { cookie } = req.headers;

  if (!cookie) {
    return res.status(401).json({ message: '로그인 후 이용가능합니다.' });
  }

  try {
    const userId = res.locals.user.id;
    const orders = await orderList.findAll({
      where: { userid: userId },
      include: [
        {
          model: order,
          attributes: ['address', 'memo', 'orderStatus'],
          include: [
            {
              model: user,
              attributes: ['email', 'phone'],
            },
          ],
        },
      ],
      attributes: {
        exclude: ['id', 'createdAt', 'updatedAt', 'userId'],
      },
    });

    for (let i = 0; i < orders.length; i++) {
      let menuId = orders[i]['menuId'];
      const menu = await chickenMenu.findOne({
        where: { id: menuId },
        raw: true,
      });
      orders[i]['dataValues'].menuName = menu['menuName'];
    }

    await myCart.destroy({ where: { userId: userId } });

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});
/* 오더 목록(손님) API 끝 */

/* 오더 등록(바로 주문하기) API 시작 */
router.post('/now/:menuId', authMWRouter, async (req, res) => {
  const { cookie } = req.headers;

  if (!cookie) {
    return res.status(401).json({ message: '로그인 후 이용가능합니다.' });
  }

  try {
    const userId = res.locals.user.id;
    const menuId = req.params.menuId;

    const menu = await chickenMenu.findOne({ where: { id: menuId } });
    const menuPrice = menu['menuPrice'];

    const address = res.locals.user.address;

    const orderAddStatus = 0;

    const addOrder = await order.create({
      address,
      totalPrice: menuPrice,
      userId,
      orderStatus: orderAddStatus,
    });

    const orderId = addOrder['dataValues']['id'];

    await orderList.create({
      menuAmount: 1,
      menuId,
      userId,
      orderId,
    });

    res.status(201).json({ message: '주문이 완료되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});

/* 오더 등록(바로 주문하기) API 끝 */

/* 오더 등록 API 시작 */
router.post('/', authMWRouter, async (req, res) => {
  const { cookie } = req.headers;

  if (!cookie) {
    return res.status(401).json({ message: '로그인 후 이용가능합니다.' });
  }

  try {
    const userId = res.locals.user.id;

    const { address, memo, totalPrice } = req.body;
    const orderAddStatus = 0;

    const addOrder = await order.create({
      address,
      memo,
      totalPrice,
      userId,
      orderStatus: orderAddStatus,
    });

    const orderId = addOrder['dataValues']['id'];

    const cart = await myCart.findAll({
      where: { userId: userId },
      raw: true,
      attributes: {
        exclude: ['id', 'createdAt', 'updatedAt', 'userId'],
      },
    });

    for (let i = 0; i < cart.length; i++) {
      let menuId = cart[i]['menuId'];
      let menuAmount = cart[i]['menuAmount'];

      await orderList.create({
        menuAmount,
        menuId,
        userId,
        orderId,
      });
    }

    res.status(200).json({ message: '주문이 완료되었습니다.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
/* 오더 등록 API 끝 */

/* 주문 수락하기 */
router.put('/update/:orderId', async (req, res) => {
  try {
    const orderId = req.params.orderId;
    await order.update({ orderStatus: 1 }, { where: { id: orderId } });
    res.status(202).json({ message: '주문이 수락되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});

/* 주문 완료하기 */
router.put('/done/:orderId', async (req, res) => {
  try {
    const orderId = req.params.orderId;
    await order.update({ orderStatus: 2 }, { where: { id: orderId } });
    res.status(202).json({ message: '주문이 완료되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});

/* 주문 거절하기 */
router.put('/refuse/:orderId', async (req, res) => {
  try {
    const orderId = req.params.orderId;
    await order.update({ orderStatus: 3 }, { where: { id: orderId } });
    res.status(202).json({ message: '주문이 거절되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});

/* 주문 삭제하기(관리자) */
router.delete('/delete/:orderId', async (req, res) => {
  try {
    const orderId = req.params.orderId;
    await order.destroy({ where: { id: orderId } });
    res.status(202).json({ message: '주문이 삭제되었습니다.' });
  } catch (error) {
    res.status(400).json({ message: '주문을 삭제할 수 없습니다.' });
  }
});

module.exports = router;
