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

  getOneUser = async email => {
    return await user.findOne({
      where: { email },
    });
  };
}

module.exports = UserRepositories;
