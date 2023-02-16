const UserRepositories = require('../repositories/user.repository');
const bcrypt = require('bcrypt');
const { all } = require('../routes/user.routes');

class UserService {
  userRepositories = new UserRepositories();

  //
  newUser = async userInfo => {
    const hashedPassword = await bcrypt.hash(userInfo.password, 10);
    userInfo.password = hashedPassword;

    await this.userRepositories.registerUser(userInfo);

    return;
  };

  allUsers = async () => {
    return await this.userRepositories.getUser();
  };
}

module.exports = UserService;
