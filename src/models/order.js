'use strict';

module.exports = (db, DataTypes) => {
    const Order = db.define('Order', {
        id: {
            type: DataTypes.UUIDV4,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        clientId: {
            type: DataTypes.UUIDV4,
            allowNull: false
        },

    });

    Order.associate = (models) => {
        Order.belongsTo(models.Client, {
            foreignKey: 'clientId',
            as: 'client'
        });
        // Order.belongsToMany(models.Product, {
        //     through: "Order_Products",
        //     as: 'products',
        //     foreignKey: 'orderId'
        // });
        Order.hasMany(models.Order_Products, {
            as: 'orderProducts',
            foreignKey: 'orderId'
        })
    }

    return Order;
}