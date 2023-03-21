//job of this table initializer is to recreate or initialize the tbales.

const categoryRepository = require("./category.repository")
const productRepository = require("./product.repository")
const userRepository = require("./user.repository")



exports.initializeTables= (forceCreation) => {
    categoryRepository.createCategoryTable(forceCreation),
    productRepository.createProductTable(forceCreation)
    userRepository.createUserTable(forceCreation)
}