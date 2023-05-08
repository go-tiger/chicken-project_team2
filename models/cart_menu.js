'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart_Menu extends Model {
    static associate(models) {
      models.Cart_Menu.belongsTo(models.Cart, { foreignKey: 'cartId' });
      models.Cart_Menu.belongsTo(models.Menu, { foreignKey: 'menuId' });
    }
  }
  Cart_Menu.init({
    quantity: DataTypes.INTEGER,
    menuId: DataTypes.INTEGER,
    cartId: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'carts_menus',
    modelName: 'Cart_Menu',
  });
  return Cart_Menu;
};