'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    static associate(models) {
      models.Menu.belongsToMany(models.Order, { through: 'Order_Menu' });
      models.Menu.hasMany(models.Cart_Menu, { foreignKey: 'menuId' });
    }
  }
  Menu.init({
    menuName: DataTypes.STRING,
    menuPrice: DataTypes.INTEGER.UNSIGNED,
    menuPhoto: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'menus',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    modelName: 'Menu',
  });
  return Menu;
};