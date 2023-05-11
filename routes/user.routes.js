const express = require('express');
const router = express.Router();
const authMWRouter = require('../middlewares/auth');

const UserController = require('../controllers/user.controller');
const userController = new UserController();

// 전체 유저 목록
router.get('/list', userController.getUsers);

// router.get('/list/:id', userController.getOneUser);
router.post('/login', userController.login);
router.post('/signup', userController.register);
// router.patch('/:userId', authMWRouter, userController.editUser);
// router.delete('/:userId', userController.deleteUsers);

// router.get('/', authMWRouter, async (req, res) => {
//   const userId = res.locals.user.id;

//   try {
//     const User = await user.findOne({
//       attributes: { exclude: ['password'] },
//       where: { id: userId },
//     });
//     res.status(200).json([{ user: User }]);
//   } catch (error) {
//     res.status(500).json({ message: err.message });
//   }
// });

// router.put('/edit', authMWRouter, async (req, res) => {
//   const userId = res.locals.user.id;
//   try {
//     const { password, phone, address } = await editValidation.validateAsync(
//       req.body
//     );
//     const hashedPassword = await bcrypt.hash(password, 12);
//     await user.update(
//       {
//         password: hashedPassword,
//         phone: phone,
//         address: address,
//       },
//       { where: { id: userId } }
//     );
//     res.status(202).json({ message: '회원 정보가 수정되었습니다.' });
//   } catch (error) {
//     if (error.isJoi) {
//       return res.status(422).json({ message: error.details[0].message });
//     }
//     res.status(500).json({ message: error.message });
//   }
// });

// router.get('/admin/users', async (req, res) => {
//   try {
//     const User = await user.findAll({ attributes: { exclude: ['password'] } });
//     res.status(200).json(User);
//   } catch (error) {
//     res.status(500).json({ message: err.message });
//   }
// });

module.exports = router;
