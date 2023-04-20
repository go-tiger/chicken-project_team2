const { user, order, chickenMenu } = require('../models');

class AdminRepository {
  userList = async () => {
    return await user.findAll({
      attributes: { exclude: ['password'] },
    });
  };

  deleteUser = async userId => {
    return await user.destroy({
      where: { id: userId },
    });
  };

  orderList = async () => {
    return await order.findAll({});
  };
  orderDone = async () => {
    return await order.findAll({});
  };
  itemList = async () => {
    return await chickenMenu.findAll({});
  };

  updateItem = async (menuName, menuPrice) => {
    return await chickenMenu.create({
      menuName,
      menuPrice,
      menuPhoto: '1',
    });
  };
}

module.exports = AdminRepository;
