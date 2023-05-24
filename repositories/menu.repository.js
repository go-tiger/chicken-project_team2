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

  getMenuById = async (menuId) => {
    try {
      return await Menu.findByPk(menuId);
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
  editMenu = async (menuId, menuName, menuPrice, fileName) => {
    try {
      // fineName 이 undefined 라면 업데이트하지 않는다.
      let menu
      if(fileName){
        menu = await Menu.findByPk(menuId)
      } 
      const previousImageName = menu?.menuPhoto

      await Menu.update(
        {
          menuName,
          menuPrice,
          ...(fileName ? { menuPhoto: fileName } : {}),
        },
        {
          where: { id: menuId },
        }
      );

      return previousImageName
    } catch (error) {
      throw Error("메뉴 수정를 실패했습니다.")
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
      throw Error("메뉴 삭제를 실패했습니다.")
    }
  };
}

module.exports = MenuRepository;
