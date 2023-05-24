const express = require('express');
const router = express.Router();
const MenuController = require('../controllers/menu.controller');
const menuController = new MenuController();
const fileUpload = require('../util/multer')
router.get('/', menuController.getMenuList);
router.get('/:menuId', menuController.getMenuById);
router.post('/', fileUpload.single('file'), menuController.createMenu);
router.patch('/:menuId', fileUpload.single('file'), menuController.editMenu);
router.delete('/:menuId', menuController.deleteMenu);

module.exports = router;
