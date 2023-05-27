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
      contactName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: "배송을 받을 사람 이름",
      },
      contactPhone: {
        type: DataTypes.STRING(20),
        allowNull: false,
        comment: "배송을 받을 사람 핸드폰 번호",
      },
      contactAddress: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "배송을 받을 주소",
      },
      memo: {
        type: DataTypes.STRING(255),
        comment: "주문자가 남긴 메모",
      },
      status: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        comment: "주문 상태 (ex. 0 = 배송대기, 1 = 배송중, 2 = 배송완료)",
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
