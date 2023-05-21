const UserService = require('../services/user.service');

class UserController {
  userService = new UserService();

  getUserInfo = async (req, res, next) => {
    try {
      const { userId, userType, newAccessToken, userName  } = req
      res.status(200).json({ userId, userType, newAccessToken, userName });
    } catch (err) {
      res.status(500).json({ message : err.message });
    }
  
  }

  getUserList = async (req, res, next) => {
    const userList = await this.userService.getUserList();
    res.status(200).json({userList});
  };

  // getOneUser = async (req, res, next) => {
  //   const { id } = req.params;

  //   const oneUser = await this.userService.oneUser(id);
  //   res.status(200).json({ oneUser });
  // };

  // // logout = async (req, res, next) => {
  // //   const logout = await this.userService.logout();

  // //   res.status(200).json({logout})
  // // };

  // editUser = async (req, res, next) => {
  //   const { userType } = res.locals.user;
  //   const userInfo = req.body;
  //   if (userType === 0) {
  //     const { id: userId } = res.locals.user;
  //     await this.userService.updateUser(userInfo, userId);
  //   } else if (userType === 2) {
  //     const { userId } = req.params;
  //     await this.userService.updateUser(userInfo, userId);
  //   }

  //   res.status(201).json({});
  // };

  // deleteUsers = async (req, res, next) => {
  //   try {
  //     const { userId } = req.params;
  //     await this.userService.deleteUsers(userId);

  //     res.status(200).json({});
  //   } catch (err) {
  //     res.status(400).send({ errorMessage: err.message });
  //   }
  // };
}

module.exports = UserController;
