require('dotenv').config();

const express = require('express');
const router = express.Router();
const authMWRouter = require('../middlewares/auth');
const MenuController = require('../controllers/menu.controller');
const menuController = new MenuController();

const { chickenMenu } = require('../models');
const { upload } = require('../util/multer');

/* 메뉴 등록 API 시작*/
/* Methud: POST | URL: /api/menu */
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { menuName, menuPrice } = req.body;
    const imgPath = req.file.path;
    const menuPhoto = imgPath.split('\\')[2];
    await chickenMenu.create({
      menuName,
      menuPrice,
      menuPhoto,
    });
    res.status(201).json({ message: '메뉴 등록이 완료되었습니다.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
/* 메뉴 등록 API 끝 */

/* 메뉴 수정 API 시작 */
router.put('/:menuId', upload.single('file'), async (req, res) => {
  try {
    const menuId = req.params.menuId;
    const { menuName, menuPrice } = req.body;
    const imgPath = req.file.path;
    const menuPhoto = imgPath.split('\\')[2];
    await chickenMenu.update(
      {
        menuName,
        menuPrice,
        menuPhoto,
      },
      {
        where: { id: menuId },
      }
    );
    res.status(201).json({ message: '메뉴 수정이 완료되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
/* 메뉴 수정 API 끝 */

/* 메뉴 삭제 API 시작 */
router.delete('/:menuId', async (req, res) => {
  try {
    const menuId = req.params.menuId;
    await chickenMenu.destroy({ where: { id: menuId } });
    res.status(201).json({ message: '메뉴 삭제가 완료되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
/* 메뉴 삭제 API 끝 */

module.exports = router;
