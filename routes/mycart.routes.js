require('dotenv').config();

const express = require('express');
const router = express.Router();
const authMWRouter = require('../middlewares/auth');

const { myCart } = require('../models');
const { chickenMenu } = require('../models');

const { JWT_SECRET_KET } = process.env;

router.get('/', authMWRouter, async (req, res) => {
  const userId = res.locals.user.id;
  // const userId = req.params.userId;
  console.log(userId);
  try {
    console.log('시도');
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

router.post('/cart/menu', async (req, res) => {
  try {
    const mid = req.params.menuId;
    const uid = req.locals.user.id;
    const { menuPrice, menuAmount } = req.body;
    // console.log(req.body);
    const menuAdd = await myCart.create({
      menuPrice,
      menuAmount,
    });

    res.status(201).json({ message: '장바구니에 담겼습니다.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/cart/menu/:menuId', async (req, res) => {
  try {
    const p = req.params.menuId;
    const { menuPrice, menuAmount } = req.body;
    // console.log(req.body);
    const menuModify = await myCart.update(
      {
        menuPrice,
        menuAmount,
      },
      {
        where: { id: p },
      }
    );
    res.status(201).json({ message: '메뉴 수정이 완료되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/cart/menu/:menuId', async (req, res) => {
  try {
    const p = req.params.menuId;
    console.log(p);
    const menuDelete = await myCart.destroy({ where: { id: p } });
    res.status(201).json({ message: '메뉴 삭제가 완료되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
