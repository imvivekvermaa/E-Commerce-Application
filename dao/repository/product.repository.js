/*
functionalities-->
create
retrieve product by productID
list all the products
list products by categoryID

Update the product

Delete the product

*/
const defineCategory = require("../models/category.model");
const { defineProducts } = require("../models/product.model");

const dbConnection = require("./dbConnection");

const Product= defineProducts(dbConnection.connection, dbConnection.DataTypes);

// Since we've the foreign key relationship, we need the other table also.

const createProductTable = async (forceCreation) => {
    const category= defineCategory(dbConnection.connection, dbConnection.DataTypes);
    Product.belongsTo(category, {
        foreignKey: "categoryID",
        targetKey: "id"
    });
    await Product.sync({force: forceCreation})
}

const createProduct= async (product)=> {
    return await Product.create({
        name: product.name,
        description: product.description,
        imageUrl: product.imageUrl,
        price: product.price,
        categoryID: product.categoryID
    })
};

const fetchProductByID= async(id) => {
    return await Product.findByPk(id)
};

// function to show all categories
const fetchAllProducts= async() => {
    return await Product.findAll()
};

// TODO
const fetchAllProductsByCriteria= async (criteria) =>{
    return await Product.findAll(criteria);
}

module.exports={
    createProductTable: createProductTable,
    createProduct: createProduct,
    fetchAllProducts: fetchAllProducts,
    fetchProductByID: fetchProductByID,
    fetchAllProductsByCriteria : fetchAllProductsByCriteria,
    // fetchProductsByName: fetchProductsByName
}
