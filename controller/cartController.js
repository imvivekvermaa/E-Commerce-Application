const { Cart } = require("../dao/repository/cart.repository");
const { Product } = require("../dao/repository/product.repository");



exports.create = (req, res) => {

    const cart = {
        userId: req.body.userId,
        cost: req.body.cost // we will get this from the middleware
    }

    
    Cart.create(cart)
    .then(cart => {
        res.status(201).send(cart);
    })
    .catch(err => {
        console.log(err.message);
        res.status(500).send({
            message: "Some internal server error occured"
        })
    })
}

//Update a given cart by adding more item to it

exports.update = (req, res) => {
    const cartId= req.params.id;

    Cart.findByPk(cartId)
    .then(cart => {
        console.log(cart);
        Product.findAll({
            where: {
                id: req.body.productIds
            }
        }).then(items => {
            if(!items){
                res.status(400).send({
                    message: "Items that trying to be added dosen't exist"
                })
            }
            cart.setProducts(items)
            .then(() => {
                console.log("Products successfully added in the cart");
                var cost= 0;
                const productsSelected = [];
                cart.getProducts().then(products => {
                    for( i= 0; i< products.length; i++){
                        cost= cost + products[i].price;
                        productsSelected.push({
                            id: products[i].id,
                            name: products[i].name,
                            cost: products[i].price
                        });                              
                    }0

                    res.status(200).send({
                        id: cart.id,
                        productsSelected: productsSelected,
                        cost: cost
                    })

                })
                
            })
        })
    })
}

//Controller to get the cart based on the cartId
exports.getCart = (req, res) => {
    var cost = 0;
    const productsSelected = [];
    cart.getProducts().then(products => {
        for(i= 0; i < products.length; i++){
            cost= cost + products[i].price;
            productsSelected.push({
                id: products[i].id,
                name: products[i].name,
                cost: products[i].price
            });
        }
        res.status(200).send({
            id: cart.id,
            productsSelected: productsSelected,
            cost: cost
        });
    });
}