const { user, order, myCart, orderList, chickenMenu } = require('../models');

class OrderRepositories {
  getOrderList = async () => {
    return await orderList.findAll({
      include: [
        {
          model: order,
          attributes: ['address', 'memo', 'orderStatus'],
          include: [
            {
              model: user,
              attributes: ['email', 'phone'],
            },
          ],
        },
      ],
      attributes: {
        exclude: ['id', 'createdAt', 'updatedAt', 'userId'],
      },
    });
  };

  addOrderByMenuId = async (user, menuId) => {
    const menu = await this.orderRepositories.findOne({
      where: {id : menuId}
    })

    const addOrder = await order.create({
      address: user.address,
      totalPrice: menu.menuPrice,
      userId: user.userId,
      orderStatus: 0,
    });

    await orderList.create({
      menuAmount: 1,
      menuId,
      userId,
      orderId: addOrder.dateValues.id,
    });
  };

  addOrder = async (userId, address, memo, totalPrice) => {
    const addOrder = await order.create({
      address,
      memo,
      totalPrice,
      userId,
      orderStatus: 0,
    });

    const cart = await myCart.findAll({
      where: { userId: userId },
      raw: true,
      attributes: {
        exclude: ['id', 'createdAt', 'updatedAt', 'userId'],
      },
    });

    for (let i = 0; i < cart.length; i++) {
      let menuId = cart[i]['menuId'];
      let menuAmount = cart[i]['menuAmount'];

      await orderList.create({
        menuAmount,
        menuId,
        userId,
        orderId : addOrder.dataValues.id,
      });
    }
  };

  acceptOrderByOrderId = async (orderId) => {
    await order.update({ orderStatus: 1 }, { where: { id: orderId } });
  };
  
  completeOrder = async (orderId) => {
    await order.update({ orderStatus: 2 }, { where: { id: orderId } });
  };

  rejectOrder = async (orderId) => {
    await order.update({ orderStatus: 3 }, { where: { id: orderId } });
  };

  deleteOrder = async (orderId) => {
    await order.destroy({ where: { id: orderId } });
  };
}
module.exports = OrderRepositories;
