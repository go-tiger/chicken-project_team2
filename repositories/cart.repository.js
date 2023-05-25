const { User, Cart, Menu, CartMenu } = require('../models');

class CartRepositories {
  addToCart = async (userId, menuId) => {
    try {
      const [cart, created] = await Cart.findOrCreate({where : {userId}})
      const menu = await Menu.findByPk(menuId);
      await cart.addMenu(menu, { through: { quantity: 1 } });     
    } catch (error) {
      throw Error(error.message)
    }
    
  }
}

module.exports = CartRepositories;
