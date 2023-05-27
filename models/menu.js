'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    static associate(models) {
      models.Menu.belongsToMany(models.Order, { through: 'Order_Menu' });
      models.Menu.belongsToMany(models.Cart, { through: 'Cart_Menu' });
    }
  }
  Menu.init({
    menuName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "메뉴 이름",
    },
    menuPrice: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      comment: "메뉴 가격",
    },
    menuPhoto: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "이미지 파일이름",
    },
  }, {
    sequelize,
    tableName: 'menus',
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    modelName: 'Menu',
  });
  return Menu;
};