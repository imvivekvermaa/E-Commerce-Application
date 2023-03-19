/*

How an api will look like for category creation endpoint
--> http://localhost:8000/category/create

How an api will look like for fetch category endpoint
--> http://localhost:8000/category/{categoryID}
*/

const categoryRouter= require("./categoryRouter");
const productRouter= require("./productRouter");


exports.createRoutes=(app) => {
    app.use("/category",categoryRouter);
    app.use("/product",productRouter);
    // app.use("/users", userRouter)
};