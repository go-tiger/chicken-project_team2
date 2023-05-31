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

  updateUser = async (req, res) => {
    try {
      const userId = req.userId;
      const { name, phone, address } = req.body;
      await this.userService.updateUser(userId, name, phone, address);
      res.status(201).json({ message : "수정이 완료되었습니다."});
    } catch (error) {
      res.status(500).json({ message : error.message });
    }
  };

  getUserByUserId = async (req, res) => {
    try {
      const userId = req.params.userId
      const user = await this.userService.getUserByUserId(userId);
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message : error.message });
    }
  };

  editUserByUserId = async (req, res) => {
    try {
      const userId = req.params.userId;
      const { name, phone, address, password } = req.body;
      if (!name || !phone || !address) {
        return res.status(400).json({ message: '모든 정보를 입력해주세요.' });
      }

      if(password && password.length < 4){
        return res.status(400).json({ message: '비밀번호는 4자리 이상이어야 합니다.' });
      }

      if(!/^\d{3}-\d{4}-\d{4}$/.test(phone)){
        return res.status(400).json({ message: '잘못된 형식의 핸드폰 번호입니다.' });
      }

      if(!/^[a-zA-Z가-힣]{2,10}$/.test(name)){
        return res.status(400).json({ message: '이름은 2글자 이상 10글자 이하로 입력 해주세요.' });
      }

      await this.userService.editUserByUserId(userId, name, phone, address, password);
      res.status(201).json({ message : "수정이 완료되었습니다."});
    } catch (error) {
      res.status(500).json({ message : error.message });
    }
  };

  deleteUser = async (req, res) => {
    try {
      const userId = req.params.userId;
      await this.userService.deleteUser(userId);
      res.status(200).json({ message: '삭제되었습니다.'});
    } catch (err) {
      res.status(400).send({ errorMessage: err.message });
    }
  };
}

module.exports = UserController;
