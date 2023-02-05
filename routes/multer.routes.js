const express = require('express');
const router = express.Router();
const path = require('path');

// const authMiddleware = require('../middleware/auth');
const multer = require('multer');

const { upload } = require('../util/multer');
const { chickenMenu } = require('../models');

router.post('/img', upload.single('file'), async (req, res) => {
  try {
    const { menuName, menuPrice } = req.body;
    const imgPath = req.file.path;
    const img = imgPath.split('\\')[2];
    const menuPhoto = img;
    console.log(menuPhoto);
    const up = await chickenMenu.create({
      menuName,
      menuPrice,
      menuPhoto,
    });
    console.log(up);
    res.status(201).json({ message: '업로드 완료.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
