const jwt = require("jsonwebtoken");
const crypto= require("crypto") //We're using crypto to generate a random hexadecimal token for access token as well as refresh tokens.
const authConfig = require("../config/auth.config");
const { addUserToken } = require("../dao/repository/userToken.repository");

const accessTokens = (req, res) => {
    const payload= req.body;
    const accessToken = getAccessToken(payload);
    const refreshToken = getRefreshedToken();
    addUserToken({
        username: payload.username,
        refreshToken: refreshToken
    }).then(result => {
        console.log("Token saved in DB successfully")
        res.status(200).send({accessToken:accessToken, refreshToken: refreshToken})
    }).catch(err => {
        console.log(" Error in saving request", err);
        res.status(500).send({
            message:`Couldn't complete request, Please try in sometime!
            `
        })
    })
    
}

function getRefreshedToken() {
    return crypto.randomBytes(64).toString("hex");
}

function getAccessToken(payload){
    //Using jitter so the access token expires time will be generlly diff for everyone. 
    const jitter= parseInt(Math.random()*120);
    const expireTime= 600 + jitter
    return jwt.sign(payload, authConfig.ACCESS_TOKEN_SECRET, {expiresIn: `${expireTime}`})

}

module.exports ={
    accessTokens: accessTokens
}