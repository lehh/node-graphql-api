'use strict';

module.exports = (db, DataTypes) => {
    const Product = db.define('Product', {
        id: {
            type: DataTypes.UUIDV4,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        }
    });

    Product.associate = (models) => {
        Product.hasMany(models.Order_Products, {
            as: 'ordersProducts',
            foreignKey: 'productId'
        });
    }

    return Product;
}