const { user } = require('../models');
const { Op } = require('sequelize');

class UserRepositories {
  registerUser = async userInfo => {
    await user.create({
      userName: userInfo.userName,
      password: userInfo.password,
      email: userInfo.email,
      phone: userInfo.phone,
      address: userInfo.address,
      userType: userInfo.userType,
    });

    return;
  };

  getUsers = async () => {
    return await user.findAll({})
  }

  getOneUser = async info => {
    // if (type === 'userId') {
    //   const User = await user.findOne({
    //     where: {
    //       id: info,
    //     },
    //   });
    //   return User;
    // }
    // if (type === 'email') {
    //   const User = await user.findOne({
    //     where: {
    //       email: info,
    //     },
    //   });
    //   return User;
    // }
    return await user.findOne({
      where: {
        [Op.or]: [{ id: info }, { email: info }],
      },
    });
  };

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
