'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class chickenMenu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.myCart.hasMany(models.myCart, { foreignKey: 'menuId' });
      models.orderlist.hasMany(models.orderlist, { foreignKey: 'menuId' });
    }
  }
  chickenMenu.init(
    {
      menuName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      menuPrice: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      menuPhoto: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      tableName: 'chickenMenu',
      modelName: 'chickenMenu',
    }
  );
  return chickenMenu;
};
