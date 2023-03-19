module.exports={
    HOST: "127.0.0.1",
    PORT: 3306,
    DB: "ecom_db",
    USER:"root",
    PASSWORD: "vivek@123",
    dialect: "mysql",
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}