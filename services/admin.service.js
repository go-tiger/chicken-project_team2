const AdminRepository = require('../repositories/admin.repository');

class adminService {
  adminRepository = new AdminRepository();

  userList = async () => {
    return await this.adminRepository.userList();
  };

  deleteUser = async userId => {
    return await this.adminRepository.deleteUser(userId);
  };

  orderList = async () => {
    return await this.adminRepository.orderList();
  };
  orderDone = async () => {
    return await this.adminRepository.orderDone();
  };
  itemList = async () => {
    return await this.adminRepository.itemList();
  };

  updateItem = async (menuName, menuPrice) => {
    try {
      if (!menuName) {
        throw Error('메뉴이름을 입력해주세요');
      }
      if (!menuPrice) {
        throw Error('가격을 입력해주세요');
      }
    } catch (error) {
      throw error;
    }
    return await this.adminRepository.updateItem(menuName, menuPrice);
  };
}

module.exports = adminService;
