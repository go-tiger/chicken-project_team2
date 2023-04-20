const OrderService = require('../services/order.service');

class orderController {
  orderService = new OrderService();

  saveOrder = async (req, res, next) => {
    const { menuId } = req.body;
    const userList = await this.orderService.userList();
    res.status(200).json({});
  };
}
module.exports = orderController;
