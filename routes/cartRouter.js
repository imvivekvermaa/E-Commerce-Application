const express = require("express")
const { create, update, getCart } = require("../controller/cartController")

const router = express.Router()

router.post("/create",create)
router.post("/update",update)
router.get("/getcart",getCart)


module.exports= router