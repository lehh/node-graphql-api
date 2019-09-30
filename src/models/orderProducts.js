'use strict';

module.exports = (db, DataTypes) => {
    const OrderProduct = db.define('Order_Products', {
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
                model: 'Product',
                key: 'id'
            }
        },
        orderId: {
            type: DataTypes.UUIDV4,
            allowNull: false,
            references: {
                model: 'Order',
                key: 'id'
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    OrderProduct.associate = (models) => {
        OrderProduct.belongsTo(models.Order, {
            as: 'order',
            foreignKey: 'orderId'
        });
        OrderProduct.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'productId'
        });
    } 

    return OrderProduct;
}