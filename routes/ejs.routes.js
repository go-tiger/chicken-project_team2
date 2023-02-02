const express = require('express');
const router = express.Router();

// 메인페이지
router.get('/', (req, res) => {
  res.render('index.ejs', { components: 'main' });
});

module.exports = router;
