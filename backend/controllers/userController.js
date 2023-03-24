const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn:'1d'})
}

// login a user
const loginUser = async (req, res) => {
    const {name,email,password,Token} = req.body
  
    try {
      const user = await User.login(name,email, password,Token)
  
      // create a token
      const token = createToken(user._id)
  
      res.status(200).json({email, token})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
}

const getusers = async(req,res) =>{

    User.find({})
    .then(users=>{
        res.json(users)
    })
    .catch(err=>{
        console.log(err)
        res.status(500)
    })

}

const postuser = async(req,res)=>{
    const {name,email,password,Token} = req.body

    try{
        const user = await User.signup(name,email,password,Token)
        
        //create token
        const token = createToken(user._id)

        res.status(200).json({email,token})
    } catch(error){
        res.status(400).json({error: error.message})
    }

    
}

const updateuser = async(req,res)=>{
    const updateduser = req.body

    User.updateOne({email:updateduser.email},{name:updateduser.name,password:updateduser.password})
    .then(result=>{
        if(result){
            res.status(200).send(result)
        }
        else{
            res.status(400).send(result)
        }
    })
    .catch(err=>{
        console.log(err)
        res.sendStatus(500)
    })
}



module.exports = {getusers,postuser,updateuser}