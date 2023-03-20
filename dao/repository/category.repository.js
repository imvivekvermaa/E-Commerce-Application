const dbConnection= require('./dbConnection');
const defineCategory= require("../models/category.model")


//function to create a new row in the Category table.
//function to select a row from the Category table.
//function to update a row in the Category table.
//function to delete a row in the Category table.
// function to show all categories

const Category= defineCategory(dbConnection.connection, dbConnection.DataTypes);

const createCategoryTable= async (forceCreation) =>{
    await Category.sync({force: forceCreation})
}

//function to create a new row in the Category table.
const save= async (category)=>{
    return await Category.create({
        name: category.name,
        description: category.description
    });
}


const fetchCategoryByID= async(id) => {
    return await Category.findByPk(id)
};

// function to show all categories
const fetchAllCategories= async() => {
    return await Category.findAll()
};

const fetchCategoriesByCriteria= async (criteria) => {
    return await Category.findAll(criteria)
}

module.exports={
    createCategoryTable: createCategoryTable,
    crateCategory:save,
    fetchCategoryByID: fetchCategoryByID,
    fetchAllCategories: fetchAllCategories,
    fetchCategoriesByCriteria : fetchCategoriesByCriteria

}

