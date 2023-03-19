const express= require('express')
const app= express();
const serverConfig= require("./configs/server.config");
const { createRoutes } = require('./routes/parentRouter');
const bodyParser= require('body-parser');
const { initializeTables } = require('./dao/repository/tableInitializers');

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get("/", (req, res)=>{
    res.send({message:`Welcome to our E-commerce Application`})
});

app.listen(serverConfig.PORT,serverConfig.HOST, ()=>{
    console.log(`Server is litening on ${serverConfig.PORT}:${serverConfig.HOST}`);
});

// IIFE- to fire up the server

(() => { 
    //configure the routers
    createRoutes(app)

    // initialize the database if enviorment is development.
    if(serverConfig.ENV === 'dev'){
        initializeTables(false);
    }
})();