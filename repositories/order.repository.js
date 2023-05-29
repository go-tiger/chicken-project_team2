const { User, Cart, Menu, Order } = require('../models');

class OrderRepositories {
  getOrderList = async (userId) => {
    try {
      const orders = await User.findAll({
        where: {id : userId},
        include: { 
          model: Order,
          include: {
            model: Menu,
          } 
        },
        order: [[Order, 'status', 'ASC'],[Order, 'createdAt', 'DESC']],
      });
      return orders
    } catch (error) {
      throw Error(error.message)
    }
  };

  addToOrder = async (userId, contactName, contactPhone, contactAddress, memo) => {
    try {
      const order = await Order.create({
        contactName,
        contactPhone,
        contactAddress,
        memo,
        userId
      })

      const user = await User.findOne({
        where : { id : userId },
        include : [{
          model : Cart,
          include : {
            model : Menu,
            attributes: ['id'],
            through : {
              attributes: ['quantity'],
            }
          },
          attributes: ['id']
        }],
        attributes: []
      })

      await user.Carts[0].Menus.forEach( async (menu) => {
        const foundMenu = await Menu.findByPk(menu.id)
        const result = await order.addMenu(foundMenu, { through: { quantity: menu.Cart_Menu.quantity }})
      });

      await Cart.destroy({ where : { id: user.Carts[0].id }})

      return user

    } catch (error) {
      throw Error(error.message)
    }
  };

  getUserAndMenu = async (userId, menuId) => {
    try {
      const user = await User.findOne({
        where : { id : userId },
        attributes : ['userName', 'email', 'phone', 'address'],
      })

      const menu = await Menu.findOne({
        where : { id : menuId },
        attributes : ['menuName', 'menuPrice'],
      })

      return {user, menu}
    } catch (error) {
      throw Error(error.message)
    }
  };

  quickOrder = async (userId, menuId, contactName, contactPhone, contactAddress, memo) => {
    try {
      const order = await Order.create({
        contactName,
        contactPhone,
        contactAddress,
        memo,
        userId,
      })
      const menu = await Menu.findByPk(menuId)
      await order.addMenu(menu, { through : { quantity : 1}})
    } catch (error) {
      throw Error(error.message)
    }
  };

  deleteOrder = async (orderId) => {
    try {
      await Order.destroy({ where: { id: orderId }});
    } catch (error) {
      throw Error(error.message)
    }
  };
}
module.exports = OrderRepositories;
