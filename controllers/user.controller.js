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

  login = async (req, res, next) => {
    try {
      const userInfo = req.body;
      const accessToken = await this.userService.login(userInfo);
      res.cookie('accessToken', accessToken);

      res.status(200).json();
    } catch (err) {
      res.status(400).json({ errorMessage: err.message });
    }
  };

  // logout = async (req, res, next) => {
  //   const logout = await this.userService.logout();

  //   res.status(200).json({logout})
  // };

  editUser = async (req, res, next) => {
    const { id: userId } = res.locals.user;
    const userInfo = req.body;
    await this.userService.updateUser(userInfo, userId);

    res.status(201).json();
  };

  deleteUsers = async (req, res, next) => {
    try {
      const { userId } = req.params;
      await this.userService.deleteUsers(userId);

      res.status(200).json();
    } catch (err) {
      res.status(400).send({ errorMessage: err.message });
    }
  };
}

module.exports = UserController;
