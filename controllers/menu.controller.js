const MenuService = require('../services/menu.service');

class menuController {
  menuService = new MenuService();

  // 메뉴 전체목록
  getAllMenu = async (req, res) => {
    try {
      const menu = await this.menuService.getAllMenu();

      res.status(200).json(menu);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  // 메뉴 등록
  addMenu = async (req, res) => {
    try {
      const { menuName, menuPrice } = req.body;
      const imgPath = req.file.path;
      const menuPhoto = imgPath.split('/')[2];
      const test = await this.menuService.addMenu(
        menuName,
        menuPrice,
        menuPhoto
      );

      res.status(201).json({ message: '메뉴 등록이 완료되었습니다.' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // 메뉴 수정
  editMenu = async (req, res) => {
    try {
      const menuId = req.params.menuId;
      console.log(req.params);
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
