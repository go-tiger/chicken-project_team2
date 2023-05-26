const { User, Cart, Menu, Cart_Menu } = require('../models');

class CartRepositories {

  getCartMenus = async (userId) => {
    try {
      return await User.findOne({
        where: {id: userId},
        include: {
          model: Cart,
          include: {
            model: Menu,
            attributes: ["id", "menuName", "menuPrice"],
            through: { attributes: ["quantity"] }
          },
          attributes: {
            exclude: ["createdAt", "updatedAt"]
          },
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "password", "userType"]
        }
      });
      

    } catch (error) {
      throw Error(error.message)
    }
  }

  addToCart = async (userId, menuId) => {
    try {
      const [cart, created] = await Cart.findOrCreate({where : {userId}})
      const menu = await Menu.findByPk(menuId);
      await cart.addMenu(menu, { through: { quantity: 1 } });     
    } catch (error) {
      throw Error(error.message)
    }
  }

  updateCartMenuQuantity = async (cartId, menuId, quantity) => {
    try {
      await Cart_Menu.update({
        quantity
      },{
        where: {
          cartId,
          menuId
        }
      })
    } catch (error) {
      throw Error(error.message)
    }
  }

  emptyToCart = async (cartId) => {
    try {
      await Cart.destroy({
        where : {
          id : cartId
        }
      })
    } catch (error) {
      throw Error(error.message)
    }
  }
}

module.exports = CartRepositories;
