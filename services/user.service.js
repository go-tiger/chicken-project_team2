const UserRepositories = require('../repositories/user.repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

class UserService {
  userRepositories = new UserRepositories();

  newUser = async userInfo => {
    const hashedPassword = await bcrypt.hash(userInfo.password, 10);
    userInfo.password = hashedPassword;
    await this.userRepositories.registerUser(userInfo);
    return;
  };

  getUsers = async () => {
    return await this.userRepositories.getUsers();
  };

  oneUser = async id => {
    return await this.userRepositories.getOneUser(id);
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
        id: user.id,
      },
      process.env.JWT_SECRET_KET
    );

    return accessToken;
  };
  
  updateUser = async (userInfo, userId) => {
    const { password, address, phone } = userInfo;
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.userRepositories.updateUser(
      userId,
      hashedPassword,
      address,
      phone
    );
  };

  deleteUsers = async userId => {
    try {
      // const { id } = await this.userRepositories.getOneUser(userId, 'userId');
      // if (id === null) {
      //   throw new Error('해당 유저가 존재하지 않습니다.');
      // }

      if (!Number(userId)) {
        throw new Error('요청 형식이 잘 못됐습니다.');
      }
      const destroyUser = await this.userRepositories.deleteUser(userId);

      if (destroyUser === 0) {
        throw new Error('삭제를 실패하였습니다.');
      }
    } catch (err) {
      throw err;
    }
  };
}

module.exports = UserService;
