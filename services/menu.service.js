const MenuRepository = require('../repositories/menu.repository');
const fs = require("fs");

class menuService {
  menuRepository = new MenuRepository();

  // 메뉴 전체목록
  getMenuList = async () => {
    try {
      return await this.menuRepository.getMenuList();
    } catch (error) {
      throw Error('메뉴를 불러오는데 실패했습니다.')
    }
  };

  // 메뉴 등록
  createMenu = async (fileName, menuName, menuPrice) => {
    try {
        
      const menu = await this.menuRepository.createMenu(fileName, menuName, menuPrice );

      return menu;
    } catch (error) {
      throw Error('메뉴 저장에 실패했습니다.');
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
  deleteMenu = async menuId => {
    try {
      const fileName = await this.menuRepository.deleteMenu(menuId);
      console.log("파일이름", fileName)
      if(fs.existsSync("uploads/" + fileName )){
        try {
          fs.unlinkSync("uploads/" + fileName)
          console.log("이미지 파일을 삭제하였습니다.")    
        } catch (error) {
          console.log(error)
        }
      }

    } catch (error) {
      throw Error('서버 오류가 발생했습니다.')
    }
  };
}

module.exports = menuService;
