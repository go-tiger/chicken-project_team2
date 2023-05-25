const express = require('express');
const router = express.Router();

const CartController = require('../controllers/cart.controller');
const cartController = new CartController();

router.post('/:menuId', cartController.addToCart)



// //유저아이디 로 찾은 카트 메뉴 모두 가져오기
// router.get('/order', async (req, res) => {
//   const userId = res.locals.user.id;

//   try {
//     const cart = await cart.findAll({
//       where: { userId: userId },
//       include: [
//         {
//           model: menu,
//           attributes: ['menuName', 'menuPrice'],
//         },
//         {
//           model: user,
//           attributes: ['address'],
//         },
//       ],
//     });
//     res.status(200).json([{ cart: cart }]);
//   } catch (error) {
//     res.status(500).json({ message: err.message });
//   }
// });

// //유저 아이디로 찾은 카트 메뉴 모두 가져오기
// router.get('/', async (req, res) => {
//   const userId = res.locals.user.id;
//   try {
//     const cart = await cart.findAll({
//       where: { userId: userId },
//       include: [
//         {
//           model: menu,
//           attributes: ['menuName', 'menuPrice'],
//         },
//       ],
//     });
//     res.status(200).json([{ cart: cart, id: userId }]);
//   } catch (error) {}
// });

// //카트에 메뉴 담기
// router.post('/:menuId', async (req, res) => {
//   try {
//     const menuid = req.params.menuId;
//     const userId = res.locals.user.id;

//     const findMenuAll = await cart.findAll({
//       where: { menuId: menuid, userId },
//       raw: true,
//     });

//     if (findMenuAll.length === 0) {
//       const addMenu = 1;
//       await cart.create({ menuAmount: addMenu, userId, menuId: menuid });
//     } else {
//       const addAmount = findMenuAll['0']['menuAmount'];

//       NewAmount = addAmount + 1;

//       await cart.update(
//         { menuAmount: NewAmount },
//         { where: { menuId: menuid, userId } }
//       );
//     }
//     res.status(201).json({ message: '장바구니에 담겼습니다.' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// /* 메뉴 수량 수정 */
// router.put('/:menuId', async (req, res) => {
//   try {
//     const menuid = req.params.menuId;
//     const putMenuAmount = req.body.menuAmount;

//     await cart.update(
//       { menuAmount: putMenuAmount },
//       { where: { id: menuid } }
//     );

//     res.status(201).json({ message: '메뉴 수정이 완료되었습니다.' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// //메뉴만 삭제
// router.delete('/:menuId', async (req, res) => {
//   try {
//     const menuid = req.params.menuId;
//     await cart.destroy({ where: { id: menuid } });
//     res.status(201).json({ message: '메뉴가 삭제되었습니다.' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// //장바구니 메뉴 모두 삭제
// router.delete('/order/:userId', async (req, res) => {
//   try {
//     await cart.destroy({ where: { userId: req.params.userId } });
//     res.status(200).json({ message: '장바구니를 비웠습니다.' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

module.exports = router;
