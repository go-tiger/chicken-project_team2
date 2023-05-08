'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      models.Order.belongsTo(models.User, { foreignKey: 'userId' });
      models.Order.belongsToMany(models.Menu, { through: 'Order_Menu' });
    }
  }
  Order.init(
    {
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "주문자의 주소",
      },
      memo: {
        type: DataTypes.STRING,
        comment: "주문자가 남긴 메모",
      },
      orderStatus: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        comment: "주문 상태 (ex. 0 = 주문완료, 1 = 배송중, 2 = 배송완료)",
      },
    },
    {
      sequelize,
      charset: "utf8",
      collate: "utf8_general_ci",
      tableName: 'orders',
      modelName: 'Order',
    }
  );
  return Order;
};
