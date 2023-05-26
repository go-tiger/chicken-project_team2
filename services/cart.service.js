const CartRepositories = require('../repositories/cart.repository');

class CartService {
  cartRepositories = new CartRepositories();

  getCartMenus = async (userId) => {
    try {
      return await this.cartRepositories.getCartMenus(userId); 
    } catch (error) {
      throw Error(error.message)
    }
  }

  addToCart = async (userId, menuId) => {
    try {
      await this.cartRepositories.addToCart(userId, menuId);
    } catch (error) {
      throw Error(error.message)
    }
  }

  updateCartMenuQuantity = async (cartId, menuId, quantity) => {
    try {
      await this.cartRepositories.updateCartMenuQuantity(cartId, menuId, quantity);
    } catch (error) {
      throw Error(error.message)
    }
  }

  emptyToCart = async (cartId) => {
    try {
      await this.cartRepositories.emptyToCart(cartId);
    } catch (error) {
      throw Error(error.message)
    }
  }

}

module.exports = CartService;
