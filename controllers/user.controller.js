const UserService = require('../services/user.service');

class UserController {
  userService = new UserService();

  register = async (req, res, next) => {
    const userInfo = req.body;

    await this.userService.newUser(userInfo);

    res.status(201);
  };

  getUsers = async (req, res, next) => {
    const { page } = req.query;
    const { count, rows, firstPage, lastPage, totalPage } =
      await this.userService.allUsers(page);

    res.status(200).json({ count, rows, firstPage, lastPage, totalPage });
  };

  getOneUser = async (req, res, next) => {
    const { id } = req.params;

    const oneUser = await this.userService.oneUser(id);
    res.status(200).json({ oneUser });
  };

  login = async (req, res, next) => {
    try {
      const userInfo = req.body;
      const accessToken = await this.userService.login(userInfo);
      res.cookie('accessToken', accessToken);

      res.status(200).json({});
    } catch (err) {
      res.status(400).json({ errorMessage: err.message });
    }
  };

  // logout = async (req, res, next) => {
  //   const logout = await this.userService.logout();

  //   res.status(200).json({logout})
  // };

  editUser = async (req, res, next) => {
    const { userType } = res.locals.user;
    const userInfo = req.body;
    if (userType === 0) {
      const { id: userId } = res.locals.user;
      await this.userService.updateUser(userInfo, userId);
    } else if (userType === 2) {
      const { userId } = req.params;
      await this.userService.updateUser(userInfo, userId);
    }

    res.status(201).json({});
  };

  deleteUsers = async (req, res, next) => {
    try {
      const { userId } = req.params;
      await this.userService.deleteUsers(userId);

      res.status(200).json({});
    } catch (err) {
      res.status(400).send({ errorMessage: err.message });
    }
  };
}

module.exports = UserController;
