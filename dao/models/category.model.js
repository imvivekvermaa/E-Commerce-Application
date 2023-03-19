/*
This model means is schema of categories. we define a user or category or anything, like this only. with their
respective column names. like here id, name, description for category model schema.
    id  : //auto-incremented,
    name:
    description:
*/

const { Sequelize, DataTypes } = require("sequelize")


const defineCategory= (conn, Sequelize)=>{
    const Category= conn.define('category',{
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
            type: DataTypes.STRING
        }
    });
    return Category
}
module.exports= defineCategory