'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      models.Cart.belongsTo(models.User, { foreignKey: 'userId' });
      models.Cart.belongsToMany(models.Menu, { through: 'Cart_Menu' });
    }
  }
  Cart.init(
    {
    },
    {
      sequelize,
      charset: "utf8",
      collate: "utf8_general_ci",
      tableName: 'carts',
      modelName: 'Cart',
    }
  );
  return Cart;
};
