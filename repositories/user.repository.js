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

  // getOneUser = async info => {
  //   const getOneUser =  await User.findOne({
  //     where: {
  //       [Op.or]: [{ id: info }, { email: info }],
  //     },
  //   });

  //   return getOneUser
  // };

  getUserList = async () => {
    return await User.findAll({})
  }


  updateUser = async (id, password, address, phone) => {
    return await user.update(
      {
        password,
        address,
        phone,
      },
      {
        where: { id },
      }
    );
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
