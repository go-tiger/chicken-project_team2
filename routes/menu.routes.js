const express = require('express');
const router = express.Router();
const MenuController = require('../controllers/menu.controller');
const menuController = new MenuController();
const fileUpload = require('../util/multer')
// router.get('/', menuController.getAllMenu);
router.post('/', fileUpload.single('file'), menuController.createMenu);
// router.patch('/:menuId', upload.single('file'), menuController.editMenu);
// router.delete('/:menuId', menuController.delMenu);


module.exports = router;
