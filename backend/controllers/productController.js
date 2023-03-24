const product = require('../models/productModel')

const getproducts = async (req,res)=>{
    product.find({})
    .then(products=>{
        res.json(products)
    })
    .catch(err=>{
        console.log(err)
    })
}

const postproduct = async (req,res)=>{
    const postproduct = req.body
    product.create(postproduct)
    .then(result=>{
        if(result){
            res.status(200).send("Product Added")
        }
        else{
            res.status(400).send("Incorrect request")
        }
    })
    .catch(err=>{
        res.sendStatus(500)
        console.log(err)
    })
    
}

const deleteproduct = async(req,res)=>{
    const id = req.params.id
    product.deleteOne({id:id})
    .then(result=>{
        res.send(result)
        console.log(result)
    })
    .catch(err=>{
        res.status(500).send(err)
        console.log(err)
    })
}


module.exports = {getproducts,postproduct,deleteproduct}