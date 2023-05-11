const { sign, verify, refreshVerify } = require('../util/jwt.util');
const redisCli = require('../util/redis.util');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = async (req, res, next) => {
  // header에서 access token을 가져옵니다.
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: '인증되지 않은 사용자입니다.' });
  } else {
    // access token 검증
    const token = authHeader.substring(7);
    const verificationResult = verify(token);

    // access token 유효한경우
    if (verificationResult.ok) {
      // access token 유효한 경우, 다음 미들웨어로 진행합니다.
      req.userId = verificationResult.id;
      next();
    } else { //// access token 유효하지 않은 경우,
      //redis cloud 리프레쉬 토큰 가져오기
      const decoded = jwt.decode(token)
      const redisRefreshToken = await redisCli.get(String(decoded?.id));

      //refresh token 이 없는 경우, 인증 실패로 처리합니다.
      if (!redisRefreshToken) {
        return res.status(401).json({ message: '인증되지 않은 사용자입니다.' });
      }

      //클라이언트와 레디스 클라우드에 저장된 refresh token 비교
      const refreshToken = req.headers.refresh
      if(redisRefreshToken !== refreshToken){
        return res.status(401).json({ message: '인증되지 않은 사용자입니다.' });
      }

      //refresh token 검증
      const refreshVerificationResult = await refreshVerify(redisRefreshToken);
      //refresh token 유효한 경우, 헤더에 access 토큰 발급
      if (refreshVerificationResult) {
        const newAccessToken = sign({ id: verificationResult.id });
      
        res.setHeader('Authorization', `Bearer ${newAccessToken}`);
        next();
      } else {
      // 리프레시 토큰이 만료되었거나 검증 실패한 경우, 인증 실패로 처리합니다.
        return res.status(401).json({ message: '인증되지 않은 사용자입니다.' });
      }
    }
  }
};
