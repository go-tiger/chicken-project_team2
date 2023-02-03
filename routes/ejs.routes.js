const express = require('express');
const router = express.Router();
const authMWRouter = require('../middlewares/auth');

// 메인페이지
router.get('/', (req, res) => {
  res.render('index.ejs', { components: 'main' });
});

router.get('/signup', (req, res) => {
  res.render('signUp.ejs');
});

router.get('/userMyPage', authMWRouter, async (req, res) => {
  res.render('userMyPage.ejs');
});

//토큰 검증 api
router.get('/login/check', authMWRouter, async (req, res) => {
  res.json({ user: res.locals.user });
});

module.exports = router;
