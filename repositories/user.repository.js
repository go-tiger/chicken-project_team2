const { User } = require('../models');

class UserRepositories {
  createUser = async (userName, password, email, phone, address, userType) => {
    try {
      const user = await User.create({ userName, password, email, phone, address, userType });

      return user
    } catch (error) {
      throw Error('회원가입에 실패했습니다.')
    }
    
  };

  getUserByEmail = async (email) => {
    try {
      const user = await User.findOne({ where: { email } });
      return user;
    } catch (error) {
      throw Error('유저정보를 가져오는데 실패했습니다.')
    }
  };

  getUserList = async () => {
    return await User.findAll({})
  }

  getUser = async (userId) => {
    try {
      return await User.findOne({
        where : { id : userId },
        attributes : ['userName', 'email', 'address', 'phone']
      })  
    } catch (error) {
      throw Error(error.message)
    }
  }

  updateUser = async (userId, name, phone, address) => {
    try {
      
      await User.update(
        {
          userName: name,
          phone, 
          address
        },
        {
          where: {id: userId},
        }
      );
    } catch (error) {
      throw Error(error.message)
    }
  };

  deleteUser = async userId => {
    try {
      const removeUser = await user.destroy({
        where: { id: userId },
      });
      return removeUser;
    } catch (err) {
      throw err;
    }
  };
}
module.exports = UserRepositories;
