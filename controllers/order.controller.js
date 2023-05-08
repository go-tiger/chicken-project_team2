const OrderService = require('../services/order.service');

class orderController {
  orderService = new OrderService();

  getOrderList = async (req, res, next) => {
    const getOrder = await this.orderService.getOrderList();
    res.status(200).json({getOrder});
  };

  addOrderByMenuId = async (req, res, next) => {
    try {
      const user = res.locals.user;
      const menuId = req.params.menuId;

      await this.orderService.addOrderByMenuId(user, menuId);
      res.status(201).json({ message: '주문이 완료되었습니다.' });
    } catch (error) {
      res.status(500).json({ 
        error: {
          message: '주문 처리 중 오류가 발생했습니다.'
        }
      });
    }
  };

  addOrder = async (req, res, next) => {
    try {
      const userId = res.locals.user.id;

      const { address, memo, totalPrice } = req.body;
      await this.orderService.addOrder(userId, address, memo, totalPrice);
      res.status(201).json({ message: '주문이 완료되었습니다.' });
    } catch (error) {
      res.status(500).json({ 
        error: {
          message: '주문 처리 중 오류가 발생했습니다.'
        }
      });
    }
  };

  acceptOrderByOrderId = async (req, res, next) => {
    try {
      const orderId = req.params.orderId;
      await this.orderService.acceptOrderByOrderId(orderId);
      res.status(200).json({ message: '주문이 수락되었습니다.'});
    } catch (error) {
      res.status(500).json({ error : {
        message : '주문 수락 중 오류가 발생했습니다.'
      } });
    }
    
  };

  completeOrder = async (req, res, next) => {
    try {
      const orderId = req.params.orderId;
      await this.orderService.completeOrder(orderId);
      res.status(200).json({ message: '주문이 완료되었습니다.' });
    } catch (error) {
      res.status(500).json({ error : {
        message : '주문 완료 중 오류가 발생했습니다.'
      } });
    }
  };

  rejectOrder = async (req, res, next) => {
    try {
      const orderId = req.params.orderId;
      await this.orderService.rejectOrder(orderId);
      res.status(200).json({ message : '주문이 거절되었습니다.'});
    } catch (error) {
      res.status(500).json({ error : {
        message : '주문 거절 중 오류가 발생했습니다.'
      } });
    }
  };

  deleteOrder = async (req, res, next) => {
    try {
      const orderId = req.params.orderId;
      await this.orderService.deleteOrder(orderId);
      res.status(204).json({ message : '삭제되었습니다.'});
    } catch (error) {
      res.status(500).json({ error : {
        message : '삭제 중 오류가 발생했습니다.'
      } });
    }
  };
}

module.exports = orderController;
