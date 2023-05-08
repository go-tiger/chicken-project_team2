const { user, order, myCart, orderList, chickenMenu } = require('../models');

class OrderRepositories {
  getOrderList = async () => {
    const getOrder = await orderList.findAll({
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
        {
          model: chickenMenu,
          attributes: ['menuName'],
        }
      ],
      attributes: {
        exclude: ['id', 'createdAt', 'updatedAt', 'userId'],
      }
    });
    return getOrder
  };

  addOrderByMenuId = async (user, menuId) => {
    const menu = await chickenMenu.findOne({
      where: {id : menuId}
    })
    const addOrder = await order.create({
      address: user.dataValues.address,
      totalPrice: menu.dataValues.menuPrice,
      userId: user.dataValues.id,
      orderStatus: 0,
      memo: "즉시주문"
    });

    await orderList.create({
      menuAmount: 1,
      menuId,
      userId: user.dataValues.id,
      orderId: addOrder.dataValues.id,
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
      where: { userId },
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
