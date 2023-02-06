require('dotenv').config();

const express = require('express');
const router = express.Router();
const authMWRouter = require('../middlewares/auth');

const { myCart } = require('../models');
const { chickenMenu } = require('../models');

router.get('/', authMWRouter, async (req, res) => {
  const userId = res.locals.user.id;
  // const userId = req.params.userId;
  console.log(userId);

  try {
    console.log('시도');
    const cart = await myCart.findAll({
      include: [
        {
          model: chickenMenu,
        },
      ],
    });

    // const cart = await myCart.findAll({
    //   attributes: {
    //     exclude: ['updatedAt'],
    //   },
    //   where: { userId: userId },
    // });
    // console.log(cart);
    res.status(200).json([{ cart: cart }]);
  } catch (error) {}
});

module.exports = router;
