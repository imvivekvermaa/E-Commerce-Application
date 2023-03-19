/*
    1. what are the different columns that we need to store as part of products.

    id, name description, image, price, cartegory_id

    2. what are the different types of queries that can come on the product table.

*/

const { DataTypes, Sequelize } = require("sequelize");

exports.deficeProducts= (conn, Sequelize)=>{
    const Products= conn.define('product',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true             //for now we can skip having images
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        categoryID: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Products;
}
