const express = require('express');
const router = express.Router();
const authMWRouter = require('../middlewares/auth');

/* 토큰 검증 api */
router.get('/login/check', authMWRouter, async (req, res) => {
  res.json({ user: res.locals.user });
});

/* 로그인 전 메인페이지 */
router.get('/', (req, res) => {
  res.render('signIn.ejs');
});

/* 회원가입 페이지 */
router.get('/signup', (req, res) => {
  res.render('signUp.ejs');
});

/* 로그아웃 */
router.delete('/logout', authMWRouter, async (req, res) => {
  console.log('로그아웃을 시도');
  return res
    .status(200)
    .clearCookie('accessToken')
    .json({ message: '성공적으로 로그아웃 되었습니다.' });
});

/* 로그인 후 메인페이지 */
router.get('/main', authMWRouter, (req, res) => {
  if (res.locals.user) {
    if (res.locals.user.userType == 0) {
      return res.render('index.ejs', { components: 'usermain' });
    } else if (res.locals.user.userType == 1) {
      return res.render('index.ejs', { components: 'ownermain' });
    } else {
      return res.render('index.ejs', { components: 'adminmain' });
    }
  }
});

/* 마이페이지 */
router.get('/mypage', authMWRouter, (req, res) => {
  if (res.locals.user) {
    if (res.locals.user.userType == 0) {
      return res.render('myPage.ejs', { components: 'usermain' });
    } else if (res.locals.user.userType == 1) {
      return res.render('myPage.ejs', { components: 'ownermain' });
    } else {
      return res.render('myPage.ejs', { components: 'adminmain' });
    }
  }
});

/* 수정 마이페이지 */
router.get('/mypage/edit', authMWRouter, (req, res) => {
  if (res.locals.user) {
    if (res.locals.user.userType == 0) {
      return res.render('myPageEdit.ejs', { components: 'usermain' });
    } else if (res.locals.user.userType == 1) {
      return res.render('myPageEdit.ejs', { components: 'ownermain' });
    } else {
      return res.render('myPageEdit.ejs', { components: 'adminmain' });
    }
  }
});

/* 임시 랜더 라우터 */
router.get('/cart', authMWRouter, (req, res) => {
  res.render('myPage.ejs');
});
router.get('/cartempty', authMWRouter, (req, res) => {
  res.render('cartEmptied.ejs');
});
router.get('/order', authMWRouter, (req, res) => {
  res.render('orderByUser.ejs');
});

router.get('/orderchk', authMWRouter, (req, res) => {
  res.render('orderCheckUser.ejs');
});

router.get('/admin', authMWRouter, (req, res) => {
  res.render('itemAdmin.ejs');
});
/* 임시 랜더 라우터 */

module.exports = router;
