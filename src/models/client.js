'use strict';

module.exports = (db, DataTypes) => {
    const Client = db.define('Client', {
        id: {
            type: DataTypes.UUIDV4,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        cnpj: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Client.associate = (models) => {
        Client.hasMany(models.Order);
    }

    return Client;
}