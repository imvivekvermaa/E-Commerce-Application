/*
    1. Cart Id
    2. PorductId, Quantity & Price
*/
// const { Sequelize, DataTypes } = require("sequelize");

exports.defineCart = (conn, DataTypes) => {
    const Cart = conn.define('cart', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        cost: {
            type: DataTypes.INTEGER,
            alloNull: false
        }
    });
    return Cart;
}