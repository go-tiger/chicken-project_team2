const { user, orderList } = require('../models');

class OrderRepositories {
  getUser = async () => {
    return await user.findAll({});
  };
}
module.exports = OrderRepositories;
