const express = require('express');
const router = express.Router();
const authMWRouter = require('../middlewares/auth');

/* 로그인 전 메인페이지 */
router.get('/', (req, res) => {
  res.render('signIn.ejs');
});

/* 회원가입 페이지 */
router.get('/signup', (req, res) => {
  res.render('signUp.ejs');
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
router.get('/editUser', authMWRouter, (req, res) => {
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

// 관리자 안에 주문목록
router.get('/adminOrder', authMWRouter, (req, res) => {
  res.render('mainAdminOrder.ejs', { components: 'mainAdmin' });
});

// 관리자 안에 완료 목록
router.get('/adminDone', authMWRouter, (req, res) => {
  res.render('mainAdminDone.ejs', { components: 'mainAdmin' });
});

// 오너 진행중 오더 목록
router.get('/OwnerDoing', authMWRouter, (req, res) => {
  res.render('mainOwnerDoing.ejs', { components: 'mainOwner' });
});

// 오너 완료 오더 목록
router.get('/OwnerDone', authMWRouter, (req, res) => {
  res.render('mainOwnerDone.ejs', { components: 'mainOwner' });
});

/* 관리자 유저 정보 수정 */
router.get('/user/:id', authMWRouter, (req, res) => {
  if (res.locals.user) {
    if (res.locals.user.userType == 2) {
      return res.render('indexMyPage.ejs', { components: 'mainAdmin' });
    }
  }
});

/* 임시 랜더 라우터 */
router.get('/cart', authMWRouter, (req, res) => {
  res.render('cart.ejs', { components: 'mainUser' });
});

/* 임시 랜더 라우터 */
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
/* 임시 랜더 라우터 */

/* 테스트 코드 */
router.get('/test', (req, res) => {
  if (!req.headers.cookie) {
    res.location('/');
  } else {
    res.render('cart.ejs');
  }
});

module.exports = router;
