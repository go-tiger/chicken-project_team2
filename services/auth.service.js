const UserRepositories = require('../repositories/user.repository');
const bcrypt = require('bcrypt');
const jwt = require('../util/jwt.util');
const redisCli = require('../util/redis.util');

class AuthService {
  userRepositories = new UserRepositories();

   createUser = async (userName, password, email, phone, address, userType) => {

    const existingUser = await this.userRepositories.getUserByEmail(email);

    if (existingUser) {
        throw new Error('이메일 중복체크');
    }
    
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createUser = await this.userRepositories.createUser(
      userName,
      hashedPassword,
      email,
      phone,
      address,
      userType,
    );

    return createUser
  };

  login = async userInfo => {
    const user = await this.userRepositories.getUserByEmail(userInfo.email);

    // 존재하지 않는 유저
    if (!user) {
      throw new Error('이메일 오류');
    }

    const inPasswordCorrect = await bcrypt.compare(
      userInfo.password,
      user.password
      );
      
    if (!user.password || !inPasswordCorrect) {
      throw new Error('비밀번호 오류');
    }

    const accessToken = jwt.sign(user);
    const refreshToken = jwt.refresh();
    const userType = user.userType

    //리프레쉬 토큰 만료시간 : day를 초로 변환 (1일 = 24시간 * 60분 * 60초)
    const expiresIn = 24 * 60 * 60

    await redisCli.set( String(user.id), refreshToken );
    await redisCli.expire( String(user.id), expiresIn);
    return {accessToken, refreshToken, userType}
  };
}

module.exports = AuthService;
