'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class myCart extends Model {
    static associate(models) {
      // define association here
      models.myCart.belongsTo(models.user, { foreignKey: 'userId' });
      models.myCart.belongsTo(models.chickenMenu, { foreignKey: 'menuId' });
    }
  }
  myCart.init(
    {
      menuAmount: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'myCart',
      modelName: 'myCart',
    }
  );
  return myCart;
};
