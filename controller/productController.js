const { CONSTRAINT_VALIDATION_ERROR } = require("../constants/errorConstants");
const { FOREIGN_KEY_CONSTRAINT_VALIDATION_ERROR } = require("../constants/errorConstants");
const productRepository = require("../dao/repository/product.repository");

const createProduct= (req, res) => {
    // 1. Name should not be null
    // 2. categoryId should not be null

    const body= req.body;
    if(!body.name || !body.categoryID){
        res.status(400).send({
            message: "Name or CategoryID cannot be null"
        })
        return;
    };
    productRepository.createProduct({
        name: body.name,
        description: body.description,
        imageUrl: body.imageUrl,
        price: body.price,
        categoryID: body.categoryID
    })
    .then(result =>{
        console.log(`Product name: ${result.name} was created successfully!`);
        res.status(201).send(result)
        return;
    })
    .catch(error =>{
        // 1.duplicate name
        if(error.name === CONSTRAINT_VALIDATION_ERROR){
            res.status(400). send({
                message: `Product name - ${body.name} already exists in the System!`
            })
            return;
        }
        throw error;
        // 2.invalid categoryID
        // 3.Internal server error

    })
    .catch(error => {
        if(error.name=== FOREIGN_KEY_CONSTRAINT_VALIDATION_ERROR){
            console.log(`Invalid category Id`)
            res.status(400).send({
                message: "Cannot add item, please check Category ID and try adding the item in it's respective category"
            })
            return;
        }
        throw error;
    })
    .catch(error =>{
        console.log(error.name)
        console.log(`Saving ${body.name} to database failed with error ${error.message}`)
        res.status(500).send({
            message: `Unable to save product ${body.name} to DB, Please try again in after sometime`
        })
        return;
    })
}

module.exports= {
    createProduct: createProduct
}