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
        type: DataTypes.STRING,
        allowNull: false,
      },
      memoPhoto: {
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
