const OrderRepositories = require('../repositories/order.repository');

class OrderService {
  orderRepositories = new OrderRepositories();

  newUser = async userInfo => {
    await this.orderRepositories.registerOrder();

    return;
  };
}

module.exports = OrderService;
