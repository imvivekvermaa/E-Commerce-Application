const { defineCart } = require("../models/cart.model");
const dbConnection = require("./dbConnection");
const { Product } = require("./product.repository");
const User = require("./user.repository");



const Cart = defineCart(dbConnection.connection, dbConnection.DataTypes);

const createCartTable = async () => {
    Product.belongsToMany(Cart, {
        through: "cart_products",
        foreignKey: "productId",
        otherKey: "cartId"
    });
    Cart.belongsToMany(Cart, {
        through: "cart_products",
        foreignKey: "cartId",
        otherKey: "productId"
    });
    User.hasMany(Cart);
    Cart.belongsTo(User);
    await Cart.sync()
    await User.sync()
    await Product.sync()
    dbConnection.connection.sync()
}

const addCart= (cart) => {
    db.Cart.create({
        amount: cart.amount
    })
}

const findByPk= async(cartId) => {
    db.Cart.findByPk(cartId)
    .then(cart => {
        cart.getProduct().then(products =>{
            var cost= 0;
            const productSelected = [];
            for( i= 0; i< products.length; i++){
                cost= cost + products[i].cost;
                productSelected.push({
                    id: products[i].id,
                    name: products[i].name,
                    cost: products[i].cost
                });
            }
            return {
                cost: cost,
                productSelected: productSelected
            };
        })
    }).then(cart => {
        cart.id = cartId
        return cart;
    }).catch(error => {
        console.log('Invalid cart Id', error);
        throw error;
    })
}

module.exports= {
    Cart: Cart,
    createCartTable: createCartTable
}
