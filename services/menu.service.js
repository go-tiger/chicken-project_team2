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

  // 메뉴 아이디 조회
  getMenuById = async (menuId) => {
    try {
      return await this.menuRepository.getMenuById(menuId);
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
  editMenu = async (menuId, menuName, menuPrice, fileName) => {
    try {
      const previousImageName = await this.menuRepository.editMenu(menuId, menuName, menuPrice, fileName);

      if(previousImageName && fs.existsSync("uploads/" + previousImageName )){
        try {
          fs.unlinkSync("uploads/" + previousImageName)
          console.log("이전 이미지 파일을 삭제하였습니다.")    
        } catch (error) {
          console.log(error)
        }
      }
    } catch (error) {
      throw Error('메뉴 수정을 실패했습니다.')
    }
  };

  // 메뉴삭제
  deleteMenu = async menuId => {
    try {
      const fileName = await this.menuRepository.deleteMenu(menuId);
      if(fs.existsSync("uploads/" + fileName )){
        try {
          fs.unlinkSync("uploads/" + fileName)
          console.log("이미지 파일을 삭제하였습니다.")    
        } catch (error) {
          console.log(error)
        }
      }

    } catch (error) {
      throw Error('메뉴 삭제를 실패했습니다.')
    }
  };
}

module.exports = menuService;
