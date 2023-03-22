const express = require("express");
const { createUserTokensTable } = require("./dao/repository/userToken.repository");
const authRouter = require("./route/authRouter")
const app = express();

app.use(express.json())

app.use('/auth', authRouter)

app.listen(4000, err=> {
    console.log(`Auth Server has started successfully!`)
});

(()=> {
    createUserTokensTable()
})();
