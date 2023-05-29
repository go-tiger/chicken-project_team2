const UserService = require('../services/user.service');

class UserController {
  userService = new UserService();

  getUserInfo = async (req, res) => {
    try {
      const { userId, userType, newAccessToken, userName  } = req
      res.status(200).json({ userId, userType, newAccessToken, userName });
    } catch (err) {
      res.status(500).json({ message : err.message });
    }
  
  }

  getUserList = async (req, res) => {
    try {
      const userList = await this.userService.getUserList();
      res.status(200).json({userList});
    } catch (error) {
      res.status(500).json({ message : err.message });
    }
  };

  getUser = async (req, res) => {
    try {
      const userId = req.userId
      const user = await this.userService.getUser(userId);
      res.status(200).json({user});
    } catch (error) {
      res.status(500).json({ message : err.message });
    }
    
  };

  updateUser = async (req, res, next) => {
    try {
      const userId = req.userId;
      const { name, phone, address } = req.body;
      await this.userService.updateUser(userId, name, phone, address);
      res.status(201).json({ message : "수정이 완료되었습니다."});
    } catch (error) {
      res.status(500).json({ message : error.message });
      
    }
  };

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
