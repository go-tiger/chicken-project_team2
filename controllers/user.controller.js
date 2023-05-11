const UserService = require('../services/user.service');

class UserController {
  userService = new UserService();

  register = async (req, res, next) => {
    try {
      const { userName, password, email, phone, address, userType } = req.body;
      if (!userName || !password || !email || !phone || !address || !userType) {
        return res.status(400).json({ message: '모든 정보를 입력해주세요.' });
      }

      if (password.length < 3) {
        return res
          .status(400)
          .json({ message: '비밀번호는 4자리 이상이어야 합니다.' });
      }

      if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(email)) {
        return res
          .status(400)
          .json({ message: '유효한 이메일 주소를 입력해주세요.' });
      }

      const createUser = await this.userService.createUser(
        userName,
        password,
        email,
        phone,
        address,
        userType
      );

      res
        .status(201)
        .json({ message: '회원가입이 완료되었습니다.', createUser });
    } catch (err) {
      if (err.message === '이메일 중복체크') {
        return res.status(409).json({ message: '이미 가입된 이메일입니다.' });
      }
      res.status(500).json({ message: err.message });
    }
  };

  login = async (req, res, next) => {
    try {
      const userInfo = req.body;
      const accessToken = await this.userService.login(userInfo);
      res.cookie('accessToken', accessToken);

      res.status(200).json({ message: '로그인 성공' });
    } catch (err) {
      res.status(400).json({ errorMessage: err.message });
    }
  };

  // 전체 유저 목록
  getUsers = async (req, res, next) => {
    try {
      const userList = await this.userService.getUsers();
      res.status(200).json({ userList });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // 특정 유저
  getOneUser = async (req, res, next) => {
    try {
      const { id } = req.params;

      const oneUser = await this.userService.oneUser(id);
      res.status(200).json({ oneUser });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // logout = async (req, res, next) => {
  //   const logout = await this.userService.logout();

  //   res.status(200).json({logout})
  // };

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
