const AdminService = require('../services/admin.service');

class adminController {
  adminService = new AdminService();

  getUserList = async (req, res, next) => {
    const userList = await this.adminService.userList();
    res.status(200).json({ userList });
  };

  deleteUser = async (req, res, next) => {
    const { userId } = req.params;
    console.log(userId);
    await this.adminService.deleteUser(userId);
    res.status(200).json();
  };

  getOrderList = async (req, res, next) => {
    const orderList = await this.adminService.orderList();
    res.status(200).json({ orderList });
  };

  getOrderDone = async (req, res, next) => {
    const orderDone = await this.adminService.orderDone();
    res.status(200).json({ orderDone });
  };

  getItemList = async (req, res, next) => {
    const itemList = await this.adminService.itemList();
    res.status(200).json({ itemList });
  };

  updateItem = async (req, res, next) => {
    const { menuName, menuPrice } = req.body;
    try {
      await this.adminService.updateItem(menuName, menuPrice);
      res.status(201).json();
    } catch (error) {
      res.status(400).send({ errorMessage: error.message });
    }
  };
}

module.exports = adminController;
