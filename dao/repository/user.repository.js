// 1. Register User
// 2. Authenticate User

const { defeineUser } = require("../models/user.model");
const dbConnection = require("./dbConnection");

const User= defeineUser(dbConnection.connection, dbConnection.DataTypes);
console.log(User.id)
const createUserTable= async (forceCreation) =>{
    return await User.sync({force: forceCreation});
}
const registerUser= async (user) => {
    const dbUser= await User.create({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        emailId: user.emailId,
        phoneNumber: user.phoneNumber,
        permission: user.permission
    });
    return {
        username: dbUser.username,
        firstName: dbUser.firstName,
        lastName: dbUser.lastName,
        emailId: dbUser.emailId,
        phoneNumber: dbUser.phoneNumber
     }  
};
const fetchUserByCriteria = async (criteria) => {
    return await User.findOne(criteria);
}

module.exports= {
    registerUser: registerUser,
    createUserTable : createUserTable,
    fetchUserByCriteria: fetchUserByCriteria
}