exports.validateAddOrUpdateCategoryRequest = (req, res, next) => {
    if(!req.body){
        res.status(400).send('Request body cannot be empty!');
        return;
    }

    if(!req.body.name){
        res.status(400).send({
            messagee:"Category name cannot be empty!"
        })
        return;
    }
    next();
};

exports.validateAddOrUpdateProductRequest= (req, res, next) => {    //A little validation on coming request before sending it ahead, if they're valid or not.
    if(!req.body){
        res.status(400).send('Request body cannot be empty!');
        return;
    }

    if(!req.body.name){
        res.status(400).send({
            messagee:"Product name cannot be empty!"
        })
        return;
    }
    if(!req.body.categoryID){
        res.status(400).send({
            messagee:"Category Id cannot be empty!"
        })
        return;
    }
    if(typeof req.body.categoryID !== "number"){
        res.status(400).send({
            messagee:"Invalid Category Id"
        })
        return;

    }
    next();

};