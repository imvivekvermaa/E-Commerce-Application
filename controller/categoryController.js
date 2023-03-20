const { MISSING_CATEGORY } = require("../constants/errorConstants");
const { CONSTRAINT_VALIDATION_ERROR } = require("../constants/errorConstants");

const categoryRepository= require("../dao/repository/category.repository");

const createCategory= (req, res)=>{
    const body= req.body;
    // name-> nonNull, description-> may or may not be present.
    if(!body.name){
        res.status(400).send({
            messagee:"Name cannot be empty!"
        })
        return
    }
    categoryRepository.createCategory({
        name: body.name,
        description: body.description
    }).then(result => {
        console.log(`Category name: ${result.name} was created successfully!`);
        res.status(201).send(result);
    }).catch(error=>{   // error handling incase of creation of same category
        if(error.name=== CONSTRAINT_VALIDATION_ERROR){   //if error is this, then
            console.log(error.errors[0]);
            res.status(400).send({                         // send back the response to client
                message: `${body.name} already exists!` 
            })
            return;                                         // return from here only. for another genuine request
        }
        throw error;                                //incase of there's any error other than unique name violation
    })                                                 // just throw that error and catch it in new catch.
    .catch(error =>{
        console.log(`Error in creating category ${body.name}. Error message: ${error.message}`);
        res.status(500).send({
            message: "Error in creating Category. Please try again after sometime."
        })
    })
}

const fetchAllCategories= (req, res)=>{
    categoryRepository.fetchAllCategories()
    .then(categories=>{
        console.log("show")
        res.status(200).send(categories)
    }).catch(error=> {
        console.log(error.message)
        res.status(500).send("Error in loading in all categories, Please try again after sometime!")
    })
}
const fetchCategoryByID= (req,res) =>{
    const categoryId= req.params.categoryId //this way we can extract categoryID directly from the URL endpoint
    categoryRepository.fetchCategoryByID(categoryId)
    .then(result => {
        if(result === null){
            res.status(404).send({
                message: `${categoryId} :${MISSING_CATEGORY}`
                
            })
            console.log(`No Category exist with ${categoryId}`)
            return;
        }
        res.status(200).send(result)
    }).catch(error=>{
        res.status(400).send("Error in fetching Category by Id from database, Please again after sometime.")
        console.log(error.message)
    })
}

const fetchCategoryByName = (req, res) => {
    categoryRepository.fetchCategoriesByCriteria({
        where: {
            name: req.params.name
        }
    }).then(result => {
        res.status(200).send(result)
        return;
    })
    .catch(error => {
        // 1. Name doesn't exist- client error
        console.log(error)
        res.status(500).send({
            message: `Error occured in processing the request. Please try again in sometime!`
        })
    })
};


module.exports= {
    create: createCategory,
    fetchAllCategories: fetchAllCategories,
    fetchCategoryByID: fetchCategoryByID,
    fetchCategoryByName : fetchCategoryByName
}