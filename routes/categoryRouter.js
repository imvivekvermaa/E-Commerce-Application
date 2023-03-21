const express= require('express');

const router= express.Router();

const categoryController= require("../controller/categoryController");
const { validateAddOrUpdateCategoryRequest } = require('../requestValidator/validations.middleware/requestValidator');

router.post("/create",validateAddOrUpdateCategoryRequest, categoryController.create);  // This is a "post" request route.   // A bad request validator has been added.
router.get("/categories", categoryController.fetchAllCategories);   //This has to be a "get" request route. 
router.get("/categoryId/:categoryId", categoryController.fetchCategoryByID);   //This has to be a "get" request route and
router.get("/categoryByName/:name", categoryController.fetchCategoryByName);   //This has to be a "get" request route and
                                                                    // category id should be there in url itself. 

module.exports= router