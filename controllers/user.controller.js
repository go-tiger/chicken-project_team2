const UserService = require('../services/user.service');

class UserController {
  userService = new UserService();

  register = async (req, res, next) => {
    const userInfo = req.body;

    await this.userService.newUser(userInfo);

    res.status(201).json();
  };

  getUsers = async (req, res, next) => {
    const allUsers = await this.userService.allUsers();

    res.status(200).json({ allUsers });
  };
}

module.exports = UserController;
