'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /*
    myCart 테이블에서 user 테이블 id컬럼 fk
  */
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('myCart', 'userId', {
      allowNull: false,
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint('myCart', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'myCart_userId_fk',
      references: {
        table: 'users',
        field: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
    });

    /*
      myCart 테이블에서 chickenMenu 테이블 id컬럼 fk
    */
    await queryInterface.addColumn('myCart', 'menuId', {
      allowNull: false,
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint('myCart', {
      fields: ['menuId'],
      type: 'foreign key',
      name: 'myCart_menuId_fk',
      references: {
        table: 'chickenMenu',
        field: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
    });

    /*
      order 테이블에서 user 테이블 id컬럼 fk
    */
    await queryInterface.addColumn('orders', 'userId', {
      allowNull: false,
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint('orders', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'order_userId_fk',
      references: {
        table: 'users',
        field: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
    });

    /*
      orderList 테이블에서 user 테이블 id컬럼 fk
    */
    await queryInterface.addColumn('orderLists', 'userId', {
      allowNull: false,
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint('orderLists', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'orderList_userId_fk',
      references: {
        table: 'users',
        field: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
    });

    /*
      orderList 테이블에서 chickenMenu 테이블 id컬럼 fk
    */
    await queryInterface.addColumn('orderLists', 'menuId', {
      allowNull: false,
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint('orderLists', {
      fields: ['menuId'],
      type: 'foreign key',
      name: 'orderList_menuId_fk',
      references: {
        table: 'chickenMenu',
        field: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
    });

    /*
      orderList 테이블에서 chickenMenu 테이블 id컬럼 fk
    */
    await queryInterface.addColumn('orderLists', 'orderId', {
      allowNull: false,
      type: Sequelize.INTEGER,
    });
    await queryInterface.addConstraint('orderLists', {
      fields: ['orderId'],
      type: 'foreign key',
      name: 'orderList_orderId_fk',
      references: {
        table: 'orders',
        field: 'id',
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
