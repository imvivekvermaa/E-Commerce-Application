const bcrypt= require('bcrypt');
const { Op } = require('sequelize');
const userRepository= require("../dao/repository/user.repository")


const createUser =( req, res) => {
    // request Validator
    encryptPassword(req.body.password)
    .then(hashedPassword => {
        req.body.password = hashedPassword;
        return userRepository.registerUser(req.body)
    })
    .then(result => res.status(201).send(result))
    .catch(error => {
        console.log(error)
        res.status(500).send({
            message: `Some error occured at the time of registration, please try again later sometime!`
        })
    })
    
}

const encryptPassword= async (password) => {
    return await bcrypt.hash(password, 10);
    
}

const login= (req, res) => {
    userRepository.fetchUserByCriteria({
        where : {
            [Op.and] : [{
                username : req.body.username
            }]
            // {
            //     emailId: req.body.emailId
            // },
            // {
            //     phoneNumber: req.body.phoneNumber
            // }]
        }
    }).then(async (user) => {
        const isValidUser = await authenticateUser(req.body.password, user.password)
        return isValidUser? user : undefined
    }).then(result => {
        if(!result){
            res.status(401).send("Invalid Usernam or Password");
            return;
        }
        console.log(result)
        res.status(200).send({
            message: `Login Successful!`
        })
    }).catch(error => {
        console.log(error)
        res.status(500).send({
            message: `Some error occured at the time of registration, please try again later sometime!`
        })
    })
}
const authenticateUser = async (password, hashedPassword) =>{
    return await bcrypt.compare(password, hashedPassword)
}

module.exports= {
    createUser: createUser,
    login: login
}