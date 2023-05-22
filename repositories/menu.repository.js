const { Menu } = require('../models');

class MenuRepository {
  // 메뉴 전체목록
  getMenuList = async () => {
    try {
      return await Menu.findAll({});
    } catch (error) {
      throw Error('메뉴를 불러오는데 실패했습니다.')
    }
  };

  // 메뉴 등록
  createMenu = async (fileName, menuName, menuPrice ) => {
    try {
      return await Menu.create({
        menuName,
        menuPrice,
        menuPhoto: fileName
      });
    } catch (error) {
      throw Error('메뉴저장에 실패했습니다.')
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
  deleteMenu = async menuId => {
    try {
      const menu = await Menu.findByPk(menuId);
      const fileName = menu.menuPhoto
      await Menu.destroy({ where: { id: menuId } });
      return fileName
    } catch (error) {
      throw Error("서버 오류가 발생했습니다.")
    }
  };
}

module.exports = MenuRepository;
