//job of this table initializer is to recreate or initialize the tbales.

const categoryRepository = require("./category.repository")

exports.initializeTables= (forceCreation) => {
    categoryRepository.createCategoryTable(forceCreation)
}