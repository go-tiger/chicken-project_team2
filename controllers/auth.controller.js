const AuthService = require('../services/auth.service');

class AuthController {
  authService = new AuthService();

  register = async (req, res, next) => {
    try {
      const { userName, password, email, phone, address, userType } = req.body;
      if (!userName || !password || !email || !phone || !address || !userType) {
        return res.status(400).json({ message: '모든 정보를 입력해주세요.' });
      }
        
      if (password.length < 4) {
        return res.status(400).json({ message: '비밀번호는 4자리 이상이어야 합니다.' });
      }

      if(!/^\d{3}-\d{4}-\d{4}$/.test(phone)){
        return res.status(400).json({ message: '잘못된 형식의 핸드폰 번호입니다.' });
      }
      
      if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(email)) {
        return res.status(400).json({ message: '유효한 이메일 주소를 입력해주세요.' });
      }

      if(!/^[a-zA-Z가-힣]{2,10}$/.test(userName)){
        return res.status(400).json({ message: '이름은 2글자 이상 10글자 이하로 입력 해주세요.' });
      }


      const createUser = await this.authService.createUser(userName, password, email, phone, address, userType);

      res.status(201).json({ message: '회원가입이 완료되었습니다.', createUser});
    } catch (err) {
      if (err.message === '이메일 중복체크') {
        return res.status(409).json({ message: '이미 가입된 이메일입니다.' });
      }
      res.status(500).json({ message : err.message });
    }
  };

  login = async (req, res, next) => {
    try {
      const userInfo = req.body;
      if(!userInfo.email){
        return res.status(400).json({ message: '아이디를 입력해주세요.' });
      }      
      if(!userInfo.password){
        return res.status(400).json({ message: '비밀번호를 입력해주세요.' });
      }

      const { accessToken, refreshToken, userType } = await this.authService.login(userInfo);
      res.status(200).json({ message: "로그인 성공",accessToken, refreshToken, userType});
    } catch (err) {
      if (err.message === '이메일 오류') {
        return res.status(400).json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
      }

      if (err.message === '비밀번호 오류') {
        return res.status(400).json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
      }

      res.status(400).json({ errorMessage: err.message });
    }
  };
}

module.exports = AuthController;
