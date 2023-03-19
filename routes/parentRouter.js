/*

How an api will look like for category creation endpoint
--> http://localhost:8000/category/create

How an api will look like for fetch category endpoint
--> http://localhost:8000/category/{categoryID}
*/

const categoryRouter= require("./categoryRouter");

exports.createRoutes=(app) => {
    app.use("/category",categoryRouter);
    // app.use("/users", userRouter)
}