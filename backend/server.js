const express = require('express')
const mongoose = require('mongoose')
const { getproducts, postproduct, deleteproduct } = require('./controllers/productController')
const {getusers,postuser, updateuser} = require('./controllers/userController')
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
//const product = require('./models/productModel')

require('dotenv').config()

const port = process.env.PORT
const mongo_uri = process.env.DATABASE
const app = express()
app.use(express.json())

//middleware to allow requests from a domain 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

//connecting to DB and Starting server
mongoose.connect(mongo_uri)
.then(()=>{
    app.listen(port,()=>{
        console.log(`Server connected to DB and Running on port ${port}`)
    })
})
.catch((err)=>{
    console.log(err)
})

// Creating a write stream for the log file
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

//Morgan middleware to log HTTP requests to a file
app.use(morgan('short', { stream: accessLogStream, skip: (req, res) => req.path.startsWith('/static') }));

//APIs for Products
app.get('/products',getproducts)

app.post('/products',postproduct)

app.delete('/products/:id',deleteproduct)

//APIs for Users
app.get('/users',getusers)

app.post('/users',postuser)

app.patch('/users',updateuser)

//APIs for Orders



