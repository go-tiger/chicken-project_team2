'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orderList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.orderList.belongsTo(models.user, { foreignKey: 'userId' });
      models.orderList.belongsTo(models.chickenMenu, { foreignKey: 'menuId' });
      models.orderList.belongsTo(models.order, { foreignKey: 'orderId' });
    }
  }
  orderList.init(
    {
      menuAmount: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'orderList',
      modelName: 'orderList',
    }
  );
  return orderList;
};
