const express = require('express');
const router = express.Router();

const authMWRouter = require('../middlewares/auth');
const { order } = require('../models');
const { myCart } = require('../models');

/* 전체 오더 목록 API 시작 */
router.get('/', async (req, res) => {
  console.log(req.headers);
  const { cookie } = req.headers;

  if (!cookie) {
    return res.status(401).json({ message: '로그인 후 이용가능합니다.' });
  }

  try {
    const allOrderList = await order.findAll({
      raw: true,
    });

    if (allOrderList.length === 0) {
      return res.status(412).json({ message: '오더목록이 없습니다.' });
    }
    return res.status(200).json({ message: '전체 오더목록을 불러왔습니다.' });
  } catch (err) {
    res.status(400).json({ errorMessage: '게시글 조회에 실패하였습니다.' });
  }
});
/* 전체 오더 목록 API 끝 */

/* 오더 등록(바로 주문하기) API 시작 */
router.post('/', authMWRouter, async (req, res) => {
  const { cookie } = req.headers;
  const userId = res.locals.user.id;

  const { address, memo, totalPrice } = req.body;

  const cart = await myCart.findAll({
    where: { userId: userId },
    raw: true,
    attributes: {
      exclude: ['id', 'createdAt', 'updatedAt', 'userId'],
    },
  });

  console.log(cart);

  // console.log(req.body);
  if (!cookie) {
    return res.status(401).json({ message: '로그인 후 이용가능합니다.' });
  }

  try {
    const { address, memo, totalPrice } = req.body;
    // console.log('userid: ', userId);
    // console.log('body: ', req.body);
    // const orderAddStatus = 0;

    // await order.create({
    //   address,
    //   memo,
    //   totalPrice,
    //   userId,
    //   orderStatus: orderAddStatus,
    // });

    // console.log(addOrder[dataValues]);
    res.status(200).json({ message: '주문' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
/* 오더 등록(바로 주문하기) API 끝 */

module.exports = router;
