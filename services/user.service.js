const UserRepositories = require('../repositories/user.repository');
const bcrypt = require('bcrypt');

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

  getUserByUserId = async (userId) => {
    try {
      return await this.userRepositories.getUserByUserId(userId);
    } catch (error) {
      throw Error(error.message)
    }
  };

  editUserByUserId = async (userId, name, phone, address, password) => {
    try {
      let hashedPassword 

      if(password){
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        hashedPassword = await bcrypt.hash(password, salt);
      }
      
      await this.userRepositories.editUserByUserId(userId, name, phone, address, hashedPassword);
    } catch (error) {
      throw Error(error.message)
    }
  };

  deleteUser = async (userId) => {
    try {
      await this.userRepositories.deleteUser(userId);
    } catch (error) {
      throw Error(error.message)
    }
  };
}

module.exports = UserService;
