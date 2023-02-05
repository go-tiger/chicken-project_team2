'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.order.belongsTo(models.user, { foreignKey: 'userId' });
    }
  }
  order.init(
    {
      orderList: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      memo: {
        type: DataTypes.STRING,
      },
      totalPrice: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      orderStatus: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'orders',
      modelName: 'order',
    }
  );
  return order;
};
