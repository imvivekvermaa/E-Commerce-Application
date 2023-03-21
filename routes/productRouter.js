const express= require("express");
const productController = require("../controller/productController");
const { validateAddOrUpdateProductRequest } = require("../requestValidator/requestValidator");
const router= express.Router();


router.post("/create", validateAddOrUpdateProductRequest, productController.createProduct);
router.get("/productByName/:name",productController.fetchProductByName);
router.get("/productByCategoryId/:categoryID",productController.fetchPorductsByCategoryAndPriceFilter);
router.get("/search",productController.searchProductsBySameNames);

module.exports= router;