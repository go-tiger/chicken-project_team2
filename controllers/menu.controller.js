const MenuService = require('../services/menu.service');

class menuController {
  menuService = new MenuService();

  // 메뉴 전체목록
  getMenuList = async (req, res) => {
    try {
      const menu = await this.menuService.getMenuList();
      res.status(200).json({menu});
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  //메뉴 아이디 조회
  getMenuById = async (req, res) => {
    try {
      const menuId = req.params.menuId
      const menu = await this.menuService.getMenuById(menuId);
      res.status(200).json({menu});
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // 메뉴 등록
  createMenu = async (req, res) => {
    try {
      const fileData = req.file;
      const fileName = fileData.filename 
      const { menuName, menuPrice } = req.body;
      if (!menuName || !menuPrice || !fileName) {
        throw new Error('메뉴 정보를 모두 입력해주세요.');
      } 

      await this.menuService.createMenu(fileName, menuName, menuPrice);
      res.status(201).json({ message: '메뉴등록이 완료되었습니다.' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // 메뉴 수정
  editMenu = async (req, res) => {
    try {
      const menuId = req.params.menuId;
      const fileName = req.file?.filename
      const { menuName, menuPrice } = req.body;
      
      await this.menuService.editMenu(menuId, menuName, menuPrice, fileName);
      res.status(201).json({ message: '메뉴 수정을 완료되었습니다.' });
    } catch (error) {
      console.log("🚀 ~ file: menu.controller.js:54 ~ menuController ~ editMenu= ~ error:", error)
      
      res.status(500).json({ error});

      // res.status(500).json({ message: '메뉴 수정을 실패했습니다.' });
    }
  };


  // 메뉴 삭제
  deleteMenu = async (req, res) => {
    try {
      const menuId = req.params.menuId;
      console.log(menuId)
      await this.menuService.deleteMenu(menuId);

      res.status(200).json({ message: '메뉴 삭제가 완료되었습니다.' });
    } catch (error) {
      res.status(500).json({ message: '메뉴 삭제를 실패했습니다.' });
    }
  };
}

module.exports = menuController;
