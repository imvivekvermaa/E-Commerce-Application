const express= require("express")
const { accessTokens, fetchNewAccessToken, authorize } = require("../controller/auth.contorller")
const router = express.Router()

router.post('/getAccessToken',accessTokens);
router.post('/refresh',fetchNewAccessToken);
router.get('/authorize',authorize);

module.exports= router;
