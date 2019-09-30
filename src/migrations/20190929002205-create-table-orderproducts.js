'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('order_products', {
      id: {
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      productId: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        references: {
          model: {
            tableName: 'products'
          },
          key: 'id'
        }
      },
      orderId: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        references: {
          model: {
            tableName: 'orders'
          },
          key: 'id'
        }
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('order_products');
  }
};
