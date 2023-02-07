require('dotenv').config();

const express = require('express');
const router = express.Router();
const authMWRouter = require('../middlewares/auth');

const { myCart, chickenMenu } = require('../models');

const { JWT_SECRET_KET } = process.env;

router.get('/', authMWRouter, async (req, res) => {
  const userId = res.locals.user.id;
  // const userId = req.params.userId;
  console.log(userId);

  try {
    const cart = await myCart.findAll({
      where: { userId: userId },
      include: [
        {
          model: chickenMenu,
          attributes: ['menuName', 'menuPrice'],
        },
      ],
    });
    res.status(200).json([{ cart: cart }]);
  } catch (error) {}
});
// console.log(cart);

router.post('/:menuId', authMWRouter, async (req, res) => {
  // console.log(req.body);
  // console.log(req.params);
  try {
    const menuid = req.params.menuId;
    const userId = res.locals.user.id;

    const findMenuAll = await myCart.findAll({
      where: { menuId: menuid, userId },
      raw: true,
    });

    if (findMenuAll.length === 0) {
      const addMenu = 1;
      await myCart.create({ menuAmount: addMenu, userId, menuId: menuid });
    } else {
      const addAmount = findMenuAll['0']['menuAmount'];

      NewAmount = addAmount + 1;

      await myCart.update(
        { menuAmount: NewAmount },
        { where: { menuId: menuid, userId } }
      );
    }
    res.status(201).json({ message: '장바구니에 담겼습니다.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 메뉴만 수정
router.put('/cart/menu/:menuId', async (req, res) => {
  try {
    const m = req.params.menuId;
    const u = req.locals.user.id;
    const { menuName, menuPrice, menuAmount } = req.body;
    // console.log(req.body);
    const menuModify = await myCart.update(
      {
        menuPrice,
        menuAmount,
        menuName,
      },
      {
        where: { mid: m },
      },
      {
        where: { uid: u },
      }
    );
    res.status(201).json({ message: '메뉴 수정이 완료되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//메뉴만 삭제
router.delete('/cart/menu/:menuId', async (req, res) => {
  try {
    const p = req.params.menuId;
    console.log(p);
    const b = req.locals.user.id;
    console.log(b);
    const menuDelete = await myCart.destroy({ where: { id: p } });
    res.status(201).json({ message: '메뉴 삭제가 완료되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
