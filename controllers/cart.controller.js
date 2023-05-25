const CartService = require('../services/cart.service');

class CartController {
  cartService = new CartService();

  addToCart = async (req, res) => {
    try {
      const userId = req.userId
      const menuId = req.params.menuId
      await this.cartService.addToCart(userId, menuId);
      res.status(201).json({ message : "장바구니에 메뉴를 담았습니다." });
    } catch (error) {
      res.status(500).json({ message : error.message })
    }
  }
}

module.exports = CartController;
