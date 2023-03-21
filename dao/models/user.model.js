const { DataTypes } = require("sequelize");



exports.defeineUser = (dbConnection, Sequelize) => {
    const User = dbConnection.define('user',{
        id: {
            type : DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        username : {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        emailId : {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        phoneNumber : {
            type: DataTypes.BIGINT,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return User;
}