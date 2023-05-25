const CartRepositories = require('../repositories/cart.repository');

class CartService {
  cartRepositories = new CartRepositories();
  addToCart = async (userId, menuId) => {
    try {
      await this.cartRepositories.addToCart(userId, menuId);
    } catch (error) {
      throw Error(error.message)
    }
  }
}

module.exports = CartService;
