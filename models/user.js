'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      models.User.hasMany(models.Cart, { foreignKey: 'userId' });
      models.User.hasMany(models.Order, { foreignKey: 'userId' });
    }
  }

  User.init(
    {
      userName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: '유저 이름',
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: '유저 비밀번호',
      },
      email: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false,
        comment: '유저 이메일',
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
        comment: '유저 전화번호',
      },
      address: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: '유저 주소',
      },
      userType: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '유저 권한 (ex. 0 = 유저, 1 = 사장, 2 = 관리자)',
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    }
  );

  return User;
};
