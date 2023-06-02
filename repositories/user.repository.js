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
      console.log("🚀 ~ file: user.repository.js:16 ~ UserRepositories ~ getUserByEmail= ~ user:", user)
      
      return user;
    } catch (error) {
      throw Error('유저정보를 가져오는데 실패했습니다.')
    }
  };

  getUserList = async () => {
    return await User.findAll({
      attributes: ['id', 'email', 'userName', 'phone', 'address', 'userType'],
      order: [['id', 'ASC']]
    })
  }

  getUser = async (userId) => {
    try {
      return await User.findOne({
        where: { id: userId },
        attributes: ['userName', 'email', 'address', 'phone']
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

  getUserByUserId = async (userId) => {
    try {
      return await User.findOne({
        where: { id: userId },
      })  
    } catch (error) {
      throw Error(error.message)
    }
  }

  editUserByUserId = async (userId, name, phone, address, hashedPassword) => {
    try {
      await User.update(
        {
          userName: name,
          phone, 
          address,
          ...(hashedPassword ? { password : hashedPassword } : {}),
        },
        {
          where: {id: userId},
        }
      );
    } catch (error) {
      throw Error(error.message)
    }
  };

  deleteUser = async (userId) => {
    try {
      User.destroy({
        where: { id: userId },
      });
    } catch (err) {
      throw Error(error.message)
    }
  };
}
module.exports = UserRepositories;
