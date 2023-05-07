const { chickenMenu } = require('../models');

class MenuRepository {
  // 메뉴 전체목록
  getAllMenu = async () => {
    try {
      return await chickenMenu.findAll({});
    } catch (error) {
      error.status = 500;
      throw error;
    }
  };

  // 메뉴 등록
  addMenu = async (menuName, menuPrice, menuPhoto) => {
    try {
      return await chickenMenu.create({
        menuName,
        menuPrice,
        menuPhoto,
      });
    } catch (error) {
      throw error;
    }
  };

  // 메뉴 수정
  editMenu = async (menuId, menuName, menuPrice, menuPhoto) => {
    try {
      return await chickenMenu.update(
        {
          menuName,
          menuPrice,
          menuPhoto,
        },
        {
          where: { id: menuId },
        }
      );
    } catch (error) {
      throw error;
    }
  };

  // 메뉴 삭제
  delMenu = async menuId => {
    try {
      return await chickenMenu.destroy({ where: { id: menuId } });
    } catch (error) {
      throw error;
    }
  };
}

module.exports = MenuRepository;
