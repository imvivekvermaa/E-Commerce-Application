const express= require('express');

const router= express.Router();

const categoryController= require("../controller/categoryController");

router.post("/create", categoryController.create);                   // This is a "post" request route.
router.get("/categories", categoryController.fetchAllCategories);   //This has to be a "get" request route. 
router.get("/:categoryId", categoryController.fetchCategoryByID);   //This has to be a "get" request route and
                                                                    // category id should be there in url itself. 

module.exports= router