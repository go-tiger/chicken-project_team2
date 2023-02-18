const jwt = require('jsonwebtoken');
const { user } = require('../models');
const dotenv = require('dotenv');
dotenv.config();

module.exports = (req, res, next) => {
  const { cookie } = req.headers;

  if (!cookie) {
    return res.status(401).json({ message: '로그인 후 이용가능합니다.' });
  }
  const [authType, authToken] = cookie.split('=');

  if (!authToken || authType !== 'accessToken') {
    return res.status(401).json({ message: '로그인 후 이용가능합니다.' });
  }
  try {
    const { id } = jwt.verify(authToken, process.env.JWT_SECRET_KET);
    user.findByPk(id).then(user => {
      res.locals.user = user;
      next();
    });
  } catch (err) {
    return res.status(401).json({ message: '로그인 후 이용가능합니다.' });
  }
};
