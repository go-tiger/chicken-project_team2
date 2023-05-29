'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart_Menu extends Model {
    static associate(models) {
      models.Cart.belongsToMany(models.Menu, { through: Cart_Menu });
      models.Menu.belongsToMany(models.Cart, { through: Cart_Menu });
    }
  }
  Cart_Menu.init(
    {
      quantity: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    }, 
    {
      sequelize,
      tableName: 'carts_menus',
      modelName: 'Cart_Menu',
    }
  );
  return Cart_Menu;
};