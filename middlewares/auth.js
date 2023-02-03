const jwt = require('jsonwebtoken');
const { user } = require('../models');

module.exports = (req, res, next) => {
  const { cookie } = req.headers;
  // console.log(cookie);

  if (!cookie) {
    return res.status(401).json({ message: '로그인 후 이용가능합니다.' });
  }
  const [authType, authToken] = cookie.split('=');

  if (!authToken || authType !== 'accessToken') {
    return res.status(401).json({ message: '로그인 후 이용가능합니다.' });
  }
  try {
    const { userId } = jwt.verify(authToken, process.env.JWT_SECRET_KET);

    user.findByPk(userId).then((user) => {
      res.locals.user = user;
      next();
    });
  } catch (err) {
    return res.status(401).json({ message: '로그인 후 이용가능합니다.' });
  }
};
