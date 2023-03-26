const express = require('express')
const mongoose = require('mongoose')
const { getproducts, postproduct, deleteproduct } = require('./controllers/productController')
const {getusers,postuser, updateuser,loginUser} = require('./controllers/userController')
const fs = require('fs');
const morgan = require('morgan');
const multer  = require('multer');
const path = require('path');
const {getOrders, postOrder,updateOrder } = require('./controllers/orderController');
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



// Create storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/public/images');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});


// Initialize multer upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit the size of the uploaded file to 1 MB
  fileFilter: function (req, file, cb) {
    // Only allow jpeg, jpg, and png file types
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Only jpeg, jpg, and png file types are allowed.'));
    }
  }
}).single('image');





//APIs for Products
app.get('/products',getproducts)

app.post('/products',postproduct)

app.delete('/products/:id',deleteproduct)

//APIs for Users
app.get('/users',getusers)

app.post('/users',postuser)

app.put('/users/:id',updateuser)

app.post('/login', loginUser)

//APIs for Orders
app.get('/orders',getOrders)

app.post('/orders',postOrder)

app.put('/orders/:id',updateOrder)



