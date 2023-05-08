const OrderRepositories = require('../repositories/order.repository');

class OrderService {
  orderRepositories = new OrderRepositories();

  getOrderList = async () => {
    return await this.orderRepositories.getOrderList();
  };

  addOrderByMenuId = async (user, menuId) => {
    await this.orderRepositories.addOrderByMenuId(user, menuId);
  };

  addOrder = async (userId, address, memo, totalPrice) => {
    await this.orderRepositories.addOrder(userId, address, memo, totalPrice);
  };

  acceptOrderByOrderId = async (orderId) => {
    await this.orderRepositories.acceptOrderByOrderId(orderId);
  };

  completeOrder = async (orderId) => {
    await this.orderRepositories.completeOrder(orderId);
  };

  rejectOrder = async (orderId) => {
    await this.orderRepositories.rejectOrder(orderId);
  };

  deleteOrder = async (orderId) => {
    await this.orderRepositories.deleteOrder(orderId);
  };
}

module.exports = OrderService;
