// jwt-util.js
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET_KET;


module.exports = {
  sign: (user) => {
     // access token 발급
    const payload = { // access token에 들어갈 payload
      id: user.id,
      userType: user.userType,
      userName : user.userName
    };

    return jwt.sign(payload, secret, { // secret으로 sign하여 발급하고 return
      algorithm: 'HS256', // 암호화 알고리즘
      expiresIn: '1s', 	  // 유효기간
    });
  },
  verify: (token) => { // access token 검증
    let decoded = null;
    try {
      decoded = jwt.verify(token, secret);
      return {
        ok: true,
        id: decoded.id,
        userType: decoded.userType,
        userName: decoded.userName
      };
    } catch (err) {
      decoded = jwt.verify(token, secret, { ignoreExpiration: true });
      return {
        ok: false,
        id: decoded.id,
        userType: decoded.userType,
        userName: decoded.userName,
        message: err.message,
      };
    }
  },
  refresh: () => { // refresh token 발급
    return jwt.sign({}, secret, { // refresh token은 payload 없이 발급
      algorithm: 'HS256',
      expiresIn: '1d',
    });
  },
  refreshVerify: async (token) => { // refresh token 검증
    try {
      jwt.verify(token, secret);
      return true;
    } catch (err) {
      return false;
    }
  }
};