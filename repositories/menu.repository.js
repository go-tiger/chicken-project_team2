const { Menu } = require('../models');

class MenuRepository {
  // 메뉴 전체목록
  getAllMenu = async () => {
    try {
      return await Menu.findAll({});
    } catch (error) {
      error.status = 500;
      throw error;
    }
  };

  // 메뉴 등록
  createMenu = async (menuName, menuPrice, imagePath) => {
    try {
      return await Menu.create({
        menuName,
        menuPrice,
        menuPhoto: imagePath
      });
    } catch (error) {
      throw error;
    }
  };

  // 메뉴 수정
  editMenu = async (menuId, menuName, menuPrice, menuPhoto) => {
    try {
      return await Menu.update(
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
      return await Menu.destroy({ where: { id: menuId } });
    } catch (error) {
      throw error;
    }
  };
}

module.exports = MenuRepository;
