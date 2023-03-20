const { CONSTRAINT_VALIDATION_ERROR } = require("../constants/errorConstants");
const { FOREIGN_KEY_CONSTRAINT_VALIDATION_ERROR } = require("../constants/errorConstants");
const productRepository = require("../dao/repository/product.repository");
const Op = require("sequelize")

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

// 1. fetch product by name
const fetchProductByName= (req, res) => {
    productRepository.fetchAllProductsByCriteria({
        where :{
            name: req.params.name
        }
    }).then(result => {
        res.status(200).send(result)
})
    .catch(error => {
        res.status(500).send({
            message: `Error Occured in the processing request, Please try again in sometimes`
        })
    })
}
// 2. fetch product by category id
const fetchPorductsByCategory= (req, res) => {
    let criteria;
    criteria= {
            where:{
                categoryID: req.params.categoryID
            }
        }
    // const minPrice = req.query.minPrice;
    // const maxPrice = req.query.maxPrice;
    // console.log(minPrice, maxPrice)
    // if(minPrice && maxPrice){
    //     criteria = {
    //         where: {
    //             [Op.and]: [
    //                 {
    //                     price: {
    //                         [Op.gte]:minPrice,
    //                         [Op.lte]:maxPrice,
    //                     }
    //                 },
    //                 {
    //                 categoryID: req.params.categoryID
    //                 }
    //             ]
    //         }
    //     }
    // }else{
    //     criteria= {
    //         where:{
    //             categoryID: req.params.categoryID
    //         }
    //     }
    // }
    productRepository.fetchAllProductsByCriteria(criteria)
    .then(result => {
        console.log(result)
        res.status(200).send(result)
    })
    .catch(error => {
        console.log(error.message)
        res.status(500).send({
            message: `Error Occured in the processing request, Please try again in sometimes`
        })
    })
}

module.exports= {
    createProduct: createProduct,
    fetchProductByName : fetchProductByName,
    fetchPorductsByCategory : fetchPorductsByCategory
}