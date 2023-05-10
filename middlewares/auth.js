const jwt = require('jsonwebtoken');
const { User } = require('../models');
const dotenv = require('dotenv');
dotenv.config();

module.exports = (req, res, next) => {
  const { cookie } = req.headers;

  if (!cookie) {
    return res.status(401).json({ message: '쿠키 없음.' });
  }
  const [authType, authToken] = cookie.split('=');
  if (!authToken || authType !== 'accessToken') {
    return res.status(401).json({ message: '토큰 불일치.' });
  }
  try {
    const { id } = jwt.verify(authToken, process.env.JWT_SECRET_KET);
    console.log(id)
    User.findByPk(id).then(user => {
      res.locals.user = user;
      next();
    });
  } catch (err) {
    return res.status(401).json({ message: '서버 에러.' });
  }
};
