const { Op } = require("sequelize");
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
const fetchPorductsByCategoryAndPriceFilter= (req, res) => {
    let criteria;
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    console.log(minPrice, maxPrice)
    if(minPrice && maxPrice){
        criteria = {
            where: {
                [Op.and]: [
                    {
                        price: {
                                [Op.gte]:minPrice,
                                [Op.lte]:maxPrice,
                            }
                    },
                    {
                        categoryID: req.params.categoryID
                        }
                ]
            }
        }
    }else{
        criteria= {
            where:{
                categoryID: req.params.categoryID
            }
        }
    }
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

const searchProductsBySameNames = (req, res) => {
    const keyword= req.query.search;
    const keywords= keyword.split(" ");
    const likeKeywords=[]
    const criteria= {};
    for(let i=0; i< keywords.length; i++){
        likeKeywords[i]={
            name : {
                [Op.like]: `%${keywords[i]}%`
            }
        }
    }
    criteria.where= {
        [Op.and]: likeKeywords
    }
    console.log(criteria);

    productRepository.fetchAllProductsByCriteria(criteria)
    .then(reseult => {
        res.status(200).send(reseult)
    })
    .catch(error => {
        console.log(error)
        res.status(500).send({
            message: 'Error occured in processing the request. Please try again later!'
        })
    })
}

module.exports= {
    createProduct: createProduct,
    fetchProductByName : fetchProductByName,
    fetchPorductsByCategoryAndPriceFilter : fetchPorductsByCategoryAndPriceFilter,
    searchProductsBySameNames: searchProductsBySameNames
}