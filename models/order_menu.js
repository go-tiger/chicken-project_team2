'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_Menu extends Model {
    static associate(models) {
      models.Order.belongsToMany(models.Menu, {
        through: Order_Menu,
        foreignKey: 'orderId',
        otherKey: 'menuId'
      });

      models.Menu.belongsToMany(models.Order, {
        through: Order_Menu,
        foreignKey: 'menuId',
        otherKey: 'orderId'
      });
    }
  }
  Order_Menu.init(
    {
      quantity: {
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
