const express = require('express');
const router = express.Router();

/* 로그인 전 메인페이지 */
router.get('/', (req, res) => {
  res.render('login.ejs')
});

/* 회원가입 페이지 */
router.get('/signup', (req, res) => {
  res.render('signup.ejs');
});

/* 로그인 후 유저가 메뉴를 볼 수 있는 메인 페이지 */
router.get('/menu', (req, res) => {
  return res.render('index.ejs', { components: 'mainPage' });
});

// 오너 or 관리자 - 오더 관리 메인 페이지 
router.get('/owner/orders', (req, res) => {
  res.render('index.ejs', { components: 'orderManagement'});
});

/* 유저 주문하기 */
router.get('/checkout', (req, res) => {
  res.render('index.ejs', { components: 'checkout'});
});

router.get('/checkout/:menuId', (req, res) => {
  res.render('index.ejs', { components: 'checkout'});
});

/* 유저 장바구니 */
router.get('/cart', (req, res) => {
  res.render('index.ejs', { components: 'cart'});
});

/* 유저 마이페이지 */
router.get('/mypage', (req, res) => {
  res.render('index.ejs', { components: 'myPage'});
});

/* 유저 마이페이지 */
router.get('/mypage/edit', (req, res) => {
  res.render('index.ejs', { components: 'myPageEdit'});
});

/* 유저 주문정보 조회 */
router.get('/orders', (req, res) => {
  res.render('index.ejs', { components: 'orderHistory'});
});

/* 관리자 유저 관리 */
router.get('/admin/users', (req, res) => {
  return res.render('index.ejs', { components: 'userList'});
});

/* 관리자 유저 정보 수정 */
router.get('/admin/users/edit', (req, res) => {
      return res.render('index.ejs', { components: 'userEdit'});
});

/* 관리자 메뉴 추가 */
router.get('/admin/menu/add', (req, res) => {
  res.render('index.ejs', { components: 'menuAdd'});
});

/* 관리자 메뉴 수정 */
router.get('/admin/menu/edit/:menuId', (req, res) => {
  res.render('index.ejs', { components: 'menuEdit'});
});

module.exports = router;
