// There's a global object called process and this "dotenv" manuplate the process and create the same property of .env file.

//  one way ---> require('dotenv').config()

// second way-->
const dotenv= require('dotenv');
dotenv.config()

module.exports={
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    ENV: process.env.ENV
}
