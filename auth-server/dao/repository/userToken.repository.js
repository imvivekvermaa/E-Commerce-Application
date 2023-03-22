const { CreateUserToken } = require("../models/UserTokens.model");
const { Op } = require('sequelize');
const dbConnection = require("./dbConnection");


const UserToken= CreateUserToken(dbConnection.connection,dbConnection.DataTypes);

const addUserToken = async (userToken) => {
    return await UserToken.create({
        username: userToken.username,
        refreshToken: userToken.refreshToken,
        // expiresAt: Date.now()+ (24*60*60*1000*10) //for temp basis, just added 10 more days in current day
        }
    );
}

const isValidUserToken = async(userToken) =>{
    const storedUserToken= await UserToken.findOne({
        where: {
            [Op.and]: [
                {
                    username: userToken.username
                },
                {
                    refreshToken: userToken.refreshToken
                }
            ]
        }
    })
    return !storedUserToken? false : true;
}

const createUserTokensTable = async() => {
    await UserToken.sync({force: false})
}

module.exports= {
    isValidUserToken: isValidUserToken,
    addUserToken: addUserToken,
    createUserTokensTable : createUserTokensTable
}