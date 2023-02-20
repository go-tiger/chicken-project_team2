const MenuService = require('../services/menu.service');

class menuController {
  menuService = new MenuService();

  getAllMenu = async (req, res, next) => {
    res.status(200).json({ userList });
  };
}

module.exports = menuController;
