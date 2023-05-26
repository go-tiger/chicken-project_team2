const CartService = require('../services/cart.service');

class CartController {
  cartService = new CartService();

  getCartMenus = async (req, res) => {
    try {
      const userId = req.userId
      const getCartInMenus = await this.cartService.getCartMenus(userId);
      res.status(200).json({ getCartInMenus });
    } catch (error) {
      res.status(500).json({ message : error.message })
    }
  }


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

  updateCartMenuQuantity = async (req, res) => {
    try {
      const cartId = req.params.cartId
      const menuId = req.params.menuId
      const quantity = Number(req.body.quantity)
      this.cartService.updateCartMenuQuantity(cartId, menuId, quantity);
      res.status(201).json({});
    } catch (error) {
      res.status(500).json({ message : error.message })
    }
  }

  emptyToCart = async (req, res) => {
    try {
      const cartId = req.params.cartId      
      this.cartService.emptyToCart(cartId);
      res.status(201).json({});
    } catch (error) {
      res.status(500).json({ message : error.message })
    }
  }
  
}

module.exports = CartController;
