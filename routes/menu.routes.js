const express = require('express');
const router = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads/' });
const MenuController = require('../controllers/menu.controller');
const menuController = new MenuController();

// router.get('/', menuController.getAllMenu);
router.post('/', upload.single('file'), menuController.createMenu);
// router.patch('/:menuId', upload.single('file'), menuController.editMenu);
// router.delete('/:menuId', menuController.delMenu);


module.exports = router;
