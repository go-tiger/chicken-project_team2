const { user } = require('../models');

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

  getUser = async () => {
    return await user.findAll({
      attributes: { exclude: ['password'] },
    });
  };

  //login api
  getOneUser = async email => {
    return await user.findOne({
      where: {
        email,
      },
    });
  };

  //delete api
  getUserId = async userId => {
    return await user.findOne({
      where: {
        id: userId,
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
