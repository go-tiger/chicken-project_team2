const UserRepositories = require('../repositories/user.repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

class UserService {
  userRepositories = new UserRepositories();

  //
  newUser = async userInfo => {
    const hashedPassword = await bcrypt.hash(userInfo.password, 10);
    userInfo.password = hashedPassword;

    await this.userRepositories.registerUser(userInfo);

    return;
  };

  allUsers = async () => {
    return await this.userRepositories.getUser();
  };

  login = async userInfo => {
    const user = await this.userRepositories.getOneUser(userInfo.email);
    const inPasswordCorrect = await bcrypt.compare(
      userInfo.password,
      user.password
    );

    if (!user.password || !inPasswordCorrect) {
      return res
        .status(400)
        .json({ message: '이메일 또는 비밀번호가 틀렸습니다.' });
    }

    const accessToken = jwt.sign(
      {
        email: user.email,
      },
      process.env.JWT_SECRET_KET
    );

    return accessToken;
  };

  editUsers = async userInfo => {
    // userInfo -> password, email , address
    // 3개의 값이 있는지 없는지 확인을 해주고 레포지토리에 넘겨주면
    // 레포지토리는 이 세개의 값을 해당 유저를 찾아서 업데이트 시켜준다!
    //
  };

  deleteUsers = async () => {};
}

module.exports = UserService;
