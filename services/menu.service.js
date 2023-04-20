const MenuRepository = require('../repositories/menu.repository');

class menuService {
  menuRepository = new MenuRepository();

  userList = async () => {
    return await this.adminRepository.menuList();
  };
}

module.exports = menuService;
