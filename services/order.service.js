const OrderRepositories = require('../repositories/order.repository');

class OrderService {
  orderRepositories = new OrderRepositories();

  getOrderList = async (userId) => {
    try {
      return await this.orderRepositories.getOrderList(userId);
    } catch (error) {
      throw Error(error.message)
    }
  };

  addToOrder = async (userId, contactName, contactPhone, contactAddress, memo) => {
    try {
      await this.orderRepositories.addToOrder(userId, contactName, contactPhone, contactAddress, memo);
    } catch (error) {
      throw Error(error.message)
    }
  };

  getUserAndMenu = async (userId, menuId) => {
    try {
      return await this.orderRepositories.getUserAndMenu(userId, menuId);  
    } catch (error) {
      throw Error(error.message)
    }
  };

  quickOrder = async (userId, menuId, contactName, contactPhone, contactAddress, memo) => {
    try {
      await this.orderRepositories.quickOrder(userId, menuId, contactName, contactPhone, contactAddress, memo);  
    } catch (error) {
      throw Error(error.message)
    }
  };

  deleteOrder = async (orderId) => {
    try {
      await this.orderRepositories.deleteOrder(orderId);
    } catch (error) {
      throw Error(error.message)
    }
  };
}

module.exports = OrderService;
