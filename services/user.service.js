const UserRepositories = require('../repositories/user.repository');
const bcrypt = require('bcrypt');
const jwt = require('../util/jwt.util');
const redisCli = require('../util/redis.util');

const dotenv = require('dotenv');
dotenv.config();

class UserService {
  getUserList = async () => {
    return await this.userRepositories.getUserList();
  };

  oneUser = async id => {
    return await this.userRepositories.getOneUser(id);
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
