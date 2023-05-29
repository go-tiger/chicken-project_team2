const UserRepositories = require('../repositories/user.repository');

class UserService {
  userRepositories = new UserRepositories()

  getUserList = async () => {
    try {
      return await this.userRepositories.getUserList();
    } catch (error) {
      throw Error(error.message)
    }
  };

  getUser = async (userId) => {
    try {
      return await this.userRepositories.getUser(userId);
    } catch (error) {
      throw Error(error.message)
    }
  };

  updateUser = async (userId, name, phone, address) => {
    try {
      await this.userRepositories.updateUser(userId, name, phone, address);
    } catch (error) {
      throw Error(error.message)
    }
  };
}

module.exports = UserService;
