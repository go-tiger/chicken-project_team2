const express = require('express');
const router = express.Router();

const { order } = require('../models');

/* 전체 오더 목록 */
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

/* 오더 주문 하기 */
router.post('/:userId', async (req, res) => {
  // const { cookie } = req.headers;

  // if (!cookie) {
  //   return res.status(401).json({ message: '로그인 후 이용가능합니다.' });
  // }

  try {
    const { userId } = req.params;
    const { orderList, address, memo, totalPrice } = req.body;
    // console.log('userid: ', userId);
    // console.log('body: ', req.body);

    const addOrder = await order.create({
      orderList,
      address,
      memo,
      totalPrice,
      userId,
    });
    console.log(addOrder);

    res.status(200).json({ message: '200' });
  } catch {
    res.status(400).json({ message: '400' });
  }
});

module.exports = router;
