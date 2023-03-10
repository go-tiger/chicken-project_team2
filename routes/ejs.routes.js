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
  return res
    .status(200)
    .clearCookie('accessToken')
    .json({ message: '성공적으로 로그아웃 되었습니다.' });
});

/* 로그인 후 메인페이지 */
router.get('/main', authMWRouter, (req, res) => {
  if (res.locals.user) {
    if (res.locals.user.userType == 0) {
      return res.render('index.ejs', { components: 'mainUser' });
    } else if (res.locals.user.userType == 1) {
      return res.render('index.ejs', { components: 'mainOwner' });
    } else {
      return res.render('index.ejs', { components: 'mainAdmin' });
    }
  }
});

/* 마이페이지 */
router.get('/mypage', authMWRouter, (req, res) => {
  if (res.locals.user) {
    if (res.locals.user.userType == 0) {
      return res.render('indexMyPage.ejs', { components: 'mainUser' });
    } else if (res.locals.user.userType == 1) {
      return res.render('indexMyPage.ejs', { components: 'mainOwner' });
    } else {
      return res.render('indexMyPage.ejs', { components: 'mainAdmin' });
    }
  }
});

/* 수정 마이페이지 */
router.get('/mypage/edit', authMWRouter, (req, res) => {
  if (res.locals.user) {
    if (res.locals.user.userType == 0) {
      return res.render('indexMyPageEdit.ejs', { components: 'mainUser' });
    } else if (res.locals.user.userType == 1) {
      return res.render('indexMyPageEdit.ejs', { components: 'mainOwner' });
    } else {
      return res.render('indexMyPageEdit.ejs', { components: 'mainAdmin' });
    }
  }
});

// 관리자 메인페이지 쪼개버리기
router.get('/adminOrder', authMWRouter, (req, res) => {
  res.render('mainAdminOrder.ejs', { components: 'mainAdmin' });
});

router.get('/adminDone', authMWRouter, (req, res) => {
  res.render('mainAdminDone.ejs', { components: 'mainAdmin' });
});

// 오너 메인페이지 쪼개버리기
router.get('/OwnerDoing', authMWRouter, (req, res) => {
  res.render('mainOwnerDoing.ejs', { components: 'mainOwner' });
});

router.get('/OwnerDone', authMWRouter, (req, res) => {
  res.render('mainOwnerDone.ejs', { components: 'mainOwner' });
});

/* 관리자 유저 정보 수정 */
router.get('/admin/editUser', authMWRouter, (req, res) => {
  if (res.locals.user) {
    if (res.locals.user.userType == 0) {
      return res.render('indexEditAdmin.ejs', { components: 'mainUser' });
    } else if (res.locals.user.userType == 1) {
      return res.render('indexEditAdmin.ejs', { components: 'mainOwner' });
    } else {
      return res.render('indexEditAdmin.ejs', { components: 'mainAdmin' });
    }
  }
});

router.get('/cart', authMWRouter, (req, res) => {
  res.render('cart.ejs', { components: 'mainUser' });
});

router.get('/cartempty', authMWRouter, (req, res) => {
  res.render('cartEmptied.ejs', { components: 'mainUser' });
});

router.get('/order', authMWRouter, (req, res) => {
  res.render('orderByUser.ejs', { components: 'mainUser' });
});

router.get('/orderchk', authMWRouter, (req, res) => {
  res.render('orderCheckUser.ejs', { components: 'mainUser' });
});

router.get('/admin', authMWRouter, (req, res) => {
  res.render('itemAdmin.ejs', { components: 'mainAdmin' });
});

router.get('/admin/editMenu', authMWRouter, (req, res) => {
  res.render('itemAdminEdit.ejs', { components: 'mainAdmin' });
});

module.exports = router;
