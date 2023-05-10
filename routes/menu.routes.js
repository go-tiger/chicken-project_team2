const express = require('express');
const router = express.Router();
const authMWRouter = require('../middlewares/auth');

//TODO 장빈 아래쪽에 3계층 정리

const { upload } = require('../util/multer');
const MenuController = require('../controllers/menu.controller');
const menuController = new MenuController();

// 메뉴 전체목록 불러오기
router.get('/', authMWRouter, menuController.getAllMenu);

// 메뉴 등록
router.post('/', upload.single('file'), menuController.addMenu);

// 메뉴 수정
router.patch('/:menuId', upload.single('file'), menuController.editMenu);

// 메뉴 삭제
router.delete('/:menuId', menuController.delMenu);

// router.get('/admin/menu', authMWRouter, async (req, res) => {
//   const userid = res.locals.user.id;
//   try {
//     const menu = await menu.findAll();
//     res.json([{ Menu: menu, id: userid }]);
//   } catch (error) {
//     res.status(500).json({ message: err.message });
//   }
// });

// /* 메뉴 등록 API 시작*/
// /* Methud: POST | URL: /api/menu */
// router.post('/', upload.single('file'), async (req, res) => {
//   try {
//     const { menuName, menuPrice } = req.body;
//     const imgPath = req.file.path;
//     const menuPhoto = imgPath.split('\\')[2];
//     await menu.create({
//       menuName,
//       menuPrice,
//       menuPhoto,
//     });
//     res.status(201).json({ message: '메뉴 등록이 완료되었습니다.' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
// /* 메뉴 등록 API 끝 */

// /* 메뉴 수정 API 시작 */
// router.put('/:menuId', upload.single('file'), async (req, res) => {
//   try {
//     const menuId = req.params.menuId;
//     const { menuName, menuPrice } = req.body;
//     const imgPath = req.file.path;
//     const menuPhoto = imgPath.split('\\')[2];
//     await menu.update(
//       {
//         menuName,
//         menuPrice,
//         menuPhoto,
//       },
//       {
//         where: { id: menuId },
//       }
//     );
//     res.status(201).json({ message: '메뉴 수정이 완료되었습니다.' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
// /* 메뉴 수정 API 끝 */

// /* 메뉴 삭제 API 시작 */
// router.delete('/:menuId', async (req, res) => {
//   try {
//     const menuId = req.params.menuId;
//     await menu.destroy({ where: { id: menuId } });
//     res.status(201).json({ message: '메뉴 삭제가 완료되었습니다.' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
// /* 메뉴 삭제 API 끝 */

module.exports = router;
