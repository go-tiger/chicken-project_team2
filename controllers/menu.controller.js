const MenuService = require('../services/menu.service');

class menuController {
  menuService = new MenuService();

  // 메뉴 전체목록
  getAllMenu = async (req, res) => {
    try {
      const userid = res.locals.user.id;
      const menu = await this.menuService.getAllMenu();

      res.status(200).json([{ Menu: menu, id: userid }]);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  // 메뉴 등록
  createMenu = async (req, res) => {
    try {
      const fileData = req.file;
      const filePath = fileData.path 
      const { menuName, menuPrice } = req.body;
      if (!menuName || !menuPrice || !filePath) {
        throw new Error('메뉴 정보를 모두 입력해주세요.');
      } 

      const menu = await this.menuService.createMenu(filePath, menuName, menuPrice);
      res.status(201).json({menu, message: '메뉴등록이 완료되었습니다.'});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // 메뉴 수정
  editMenu = async (req, res) => {
    try {
      const menuId = req.params.menuId;
      const { menuName, menuPrice } = req.body;
      const imgPath = req.file.path;
      const menuPhoto = imgPath.split('/')[2];

      await this.menuService.editMenu(menuId, menuName, menuPrice, menuPhoto);
      res.status(201).json({ message: '메뉴 수정이 완료되었습니다.' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // 메뉴 삭제
  delMenu = async (req, res) => {
    try {
      const menuId = req.params.menuId;

      await this.menuService.delMenu(menuId);
      res.status(200).json({ message: '메뉴 삭제가 완료되었습니다.' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = menuController;
