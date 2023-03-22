const express= require("express")
const { accessTokens } = require("../controller/auth.contorller")
const router = express.Router()

router.post('/getAccessToken',accessTokens);

module.exports= router;
