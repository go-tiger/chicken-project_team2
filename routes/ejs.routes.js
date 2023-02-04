const express = require('express');
const router = express.Router();
const authMWRouter = require('../middlewares/auth');

// 메인페이지
router.get('/', (req, res) => {
  res.render('index.ejs', { components: 'main' });
});

router.get('/signup', (req, res) => {
  res.render('index.ejs', { components: 'signup' });
});

router.get('/main', authMWRouter, async (req, res) => {
  if (res.locals.user) {
    if (res.locals.user.userType == 0) {
      return res.render('index.ejs', { components: 'usermain' });
    } else if (res.locals.user.userType == 1) {
      return res.render('index.ejs', { components: 'ownermain' });
    } else {
      return res.render('index.ejs', { components: 'adminmain' });
    }
  } else {
    location.href = '/';
  }
});

//토큰 검증 api
router.get('/login/check', authMWRouter, async (req, res) => {
  res.json({ user: res.locals.user });
});

router.delete('/logout', authMWRouter, async (req, res) => {
  console.log('로그아웃을 시도');
  return res
    .status(200)
    .clearCookie('accessToken')
    .json({ message: '성공적으로 로그아웃 되었습니다.' });
});

module.exports = router;
