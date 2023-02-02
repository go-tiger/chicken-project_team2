const express = require('express');
const router = express.Router();

// 메인페이지
router.get('/', (req, res) => {
  res.render('index.ejs', { components: 'main' });
});

router.get('/signup', (req, res) => {
  res.render('signUp.ejs');
});

module.exports = router;
