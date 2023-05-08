'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_Menu extends Model {
    static associate(models) {
      // define association here
      models.Order_Menu.belongsTo(models.Order, { foreignKey: 'orderId' });
      models.Order_Menu.belongsTo(models.Menu, { foreignKey: 'menuId' });
    }
  }
  Order_Menu.init(
    {
      quantity: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      menuId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      orderId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'orders_menus',
      modelName: 'Order_Menu',
    }
  );
  return Order_Menu;
};
