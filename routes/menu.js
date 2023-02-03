require('dotenv').config();

const express = require('express');
const router = express.Router();

const { chickenMenu } = require('../models');

const { JWT_SECRET_KET } = process.env;

router.get('/admin/menu', async (req, res) => {
  try {
    const menu = await chickenMenu.findAll();
    res.json(menu);
  } catch (error) {}
});

router.post('/admin/menu', async (req, res) => {
  try {
    const { menuName, menuPrice, menuPhoto } = req.body;
    console.log(req.body);
    const menuAdd = await chickenMenu.create({
      menuName,
      menuPrice,
      menuPhoto,
    });

    res.status(201).json({ message: '메뉴 등록이 완료되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/admin/menu/:menuId', async (req, res) => {
  try {
    const p = req.params.menuId;
    const { menuName, menuPrice, menuPhoto } = req.body;
    console.log(req.body);
    const menuModify = await chickenMenu.update(
      {
        menuName,
        menuPrice,
        menuPhoto,
      },
      {
        where: { id: p },
      }
    );
    res.status(201).json({ message: '메뉴 수정이 완료되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/admin/menu/:menuId', async (req, res) => {
  try {
    const p = req.params.menuId;
    console.log(p);
    const menuDelete = await chickenMenu.destroy({ where: { id: p } });
    res.status(201).json({ message: '메뉴 삭제가 완료되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
