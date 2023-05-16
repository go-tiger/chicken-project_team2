const express = require('express');
const router = express.Router();

/* 로그인 전 메인페이지 */
router.get('/', (req, res) => {
  res.render('login.ejs');
});

/* 회원가입 페이지 */
router.get('/signup', (req, res) => {
  res.render('signup.ejs');
});

/* 로그인 후 유저가 메뉴를 볼 수 있는 메인 페이지 */
router.get('/menu', (req, res) => {
  return res.render('mainPage.ejs');
});

// 오너 or 관리자 - 오더 관리 메인 페이지 
router.get('/owner/orders', (req, res) => {
  res.render('orderManagement.ejs');
});

/* 유저 주문하기 */
router.get('/checkout', (req, res) => {
  res.render('checkout.ejs');
});

/* 유저 장바구니 */
router.get('/cart', (req, res) => {
  res.render('cart.ejs');
});

/* 유저 마이페이지 */
router.get('/mypage', (req, res) => {
  res.render('myPage.ejs');
});

/* 유저 주문정보 조회 */
router.get('/orders', (req, res) => {
  res.render('orderHistory.ejs');
});

/* 관리자 유저 정보 수정 */
router.get('/admin/users/edit', (req, res) => {
      return res.render('userEdit.ejs');
});

/* 관리자 메뉴 추가 */
router.get('/admin/menu/add', (req, res) => {
  res.render('menuAdd.ejs');
});

/* 관리자 메뉴 수정 */
router.get('/admin/menu/edit', (req, res) => {
  res.render('menuEdit.ejs');
});

module.exports = router;
