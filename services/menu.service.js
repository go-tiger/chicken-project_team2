const MenuRepository = require('../repositories/menu.repository');

class menuService {
  menuRepository = new MenuRepository();

  // 메뉴 전체목록
  getAllMenu = async () => {
    try {
      const menu = await this.menuRepository.getAllMenu();
      return menu;
    } catch (error) {
      throw error;
    }
  };

  // 메뉴 등록
  addMenu = async (menuName, menuPrice, menuPhoto) => {
    try {
      return await this.menuRepository.addMenu(menuName, menuPrice, menuPhoto);
    } catch (error) {
      throw error;
    }
  };

  // 메뉴 수정
  editMenu = async (menuId, menuName, menuPrice, menuPhoto) => {
    try {
      return await this.menuRepository.editMenu(
        menuId,
        menuName,
        menuPrice,
        menuPhoto
      );
    } catch (error) {
      throw error;
    }
  };

  // 메뉴삭제
  delMenu = async menuId => {
    try {
      return await this.menuRepository.delMenu(menuId);
    } catch (error) {
      throw error;
    }
  };
}

module.exports = menuService;
