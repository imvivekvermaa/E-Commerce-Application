const jwt = require("jsonwebtoken");
const crypto= require("crypto") //We're using crypto to generate a random hexadecimal token for access token as well as refresh tokens.
const authConfig = require("../config/auth.config");
const { addUserToken, isValidUserToken } = require("../dao/repository/userToken.repository");
const { config } = require("dotenv");

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

const fetchNewAccessToken = (req, res) => {
    // 1. the expired access token- that will have the username
    // 2. the refresh token
    const accessToken= req.body.accessToken;
    const decodeToken = jwt.decode(accessToken);
    console.log(decodeToken);
    // Homework- if the received old token has not been expired yet-  we can return (204)
    // if the token has expired- validate the refresh token and the user.

    isValidUserToken({
        username : decodeToken.username,
        refreshToken: req.body.refreshToken
    }).then(result=> {
        if(result){
            res.status(200).send({
                accessToken: getAccessToken({username: decodeToken.username}),
                refreshToken: req.body.refreshToken
            })
        }
        res.status(401)

    }).catch(err => {
        console.log("error occured" + err);
        res.status(500).send({
            message:`Couldn't complete request, Please try in sometime!
            `
        })
    })
}

const authorize = (req, res) => {
    {
        const authHeader = req.headers['authorization'];
        const accessToken= authHeader.split(' ')[1];
        if(!accessToken){
            res.send(401);
            return;
        }
        jwt.verify(accessToken, authConfig.ACCESS_TOKEN_SECRET, (err, payload) =>{
            if(err){
                res.sendStatus(403);
                return;
            }
            req.user = payload;
        })
    }
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
    accessTokens: accessTokens,
    fetchNewAccessToken: fetchNewAccessToken,
    authorize: authorize
}