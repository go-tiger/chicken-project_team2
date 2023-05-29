const express = require('express');
const router = express.Router();

const CartController = require('../controllers/cart.controller');
const cartController = new CartController();

router.post('/:menuId', cartController.addToCart)
router.get('/', cartController.getCartMenus);
router.patch('/:cartId/menu/:menuId', cartController.updateCartMenuQuantity)
router.delete('/:cartId', cartController.emptyToCart)

module.exports = router;
