const OrderService = require('../services/order.service');

class orderController {
  orderService = new OrderService();

  getOrderList = async (req, res) => {
    try {
      const userId = req.userId;
      const orders = await this.orderService.getOrderList(userId);
      res.status(200).json({orders});
    } catch (error) {
      res.status(500).json({ error : error.message});
    }
  };

  addToOrder = async (req, res) => {
    try {
      const userId = req.userId;
      const {contactName, contactPhone, contactAddress, memo} = req.body
      
      if(!contactName || !contactPhone || !contactAddress){
        return res.status(400).json({ message: '모든 정보를 입력해주세요.' });
      }

      await this.orderService.addToOrder(userId, contactName, contactPhone, contactAddress, memo);
      res.status(201).json({ message: '주문이 완료되었습니다.' });
    } catch (error) {
      res.status(500).json({ message : error.message });
    }
  };

  getUserAndMenu = async (req, res) => {
    try {
      const userId = req.userId;
      const menuId = req.params.menuId;
      const preOrderInfo = await this.orderService.getUserAndMenu(userId, menuId);
      res.status(200).json({ preOrderInfo });
    } catch (error) {
      res.status(500).json({ 
        error : error.message
      });
    }
  };

  quickOrder = async (req, res) => {
    try {
      const userId = req.userId;
      const menuId = req.params.menuId;
      const {contactName, contactPhone, contactAddress, memo} = req.body
      await this.orderService.quickOrder(userId, menuId, contactName, contactPhone, contactAddress, memo);
      res.status(200).json({ message: '주문이 완료되었습니다.' });
    } catch (error) {
      res.status(500).json({ 
        error : error.message
      });
    }
  };

  deleteOrder = async (req, res) => {
    try {
      const orderId = req.params.orderId;
      await this.orderService.deleteOrder(orderId);
      res.status(201).json({ message : '삭제되었습니다.'});
    } catch (error) {
      res.status(500).json({ error : error.message});
    }
  };
}

module.exports = orderController;
