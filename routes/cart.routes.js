require('dotenv').config();

const express = require('express');
const router = express.Router();
const authMWRouter = require('../middlewares/auth');

const { user, cart, menu } = require('../models');

const { JWT_SECRET_KET } = process.env;

router.get('/order', authMWRouter, async (req, res) => {
  const userId = res.locals.user.id;

  try {
    const cart = await cart.findAll({
      where: { userId: userId },
      include: [
        {
          model: menu,
          attributes: ['menuName', 'menuPrice'],
        },
        {
          model: user,
          attributes: ['address'],
        },
      ],
    });
    res.status(200).json([{ cart: cart }]);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', authMWRouter, async (req, res) => {
  const userId = res.locals.user.id;
  try {
    const cart = await cart.findAll({
      where: { userId: userId },
      include: [
        {
          model: menu,
          attributes: ['menuName', 'menuPrice'],
        },
      ],
    });
    res.status(200).json([{ cart: cart, id: userId }]);
  } catch (error) {}
});

router.post('/:menuId', authMWRouter, async (req, res) => {
  try {
    const menuid = req.params.menuId;
    const userId = res.locals.user.id;

    const findMenuAll = await cart.findAll({
      where: { menuId: menuid, userId },
      raw: true,
    });

    if (findMenuAll.length === 0) {
      const addMenu = 1;
      await cart.create({ menuAmount: addMenu, userId, menuId: menuid });
    } else {
      const addAmount = findMenuAll['0']['menuAmount'];

      NewAmount = addAmount + 1;

      await cart.update(
        { menuAmount: NewAmount },
        { where: { menuId: menuid, userId } }
      );
    }
    res.status(201).json({ message: '장바구니에 담겼습니다.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* 메뉴 수량 수정 */
router.put('/:menuId', async (req, res) => {
  try {
    const menuid = req.params.menuId;
    const putMenuAmount = req.body.menuAmount;

    await cart.update(
      { menuAmount: putMenuAmount },
      { where: { id: menuid } }
    );

    res.status(201).json({ message: '메뉴 수정이 완료되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//메뉴만 삭제
router.delete('/:menuId', async (req, res) => {
  try {
    const menuid = req.params.menuId;
    await cart.destroy({ where: { id: menuid } });
    res.status(201).json({ message: '메뉴가 삭제되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//장바구니 메뉴 모두 삭제
router.delete('/order/:userId', async (req, res) => {
  try {
    await cart.destroy({ where: { userId: req.params.userId } });
    res.status(200).json({ message: '장바구니를 비웠습니다.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
