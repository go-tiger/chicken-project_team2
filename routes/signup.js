require('dotenv').config();

const express = require("express")
const router = express.Router();

const{signupValidation} = require('../validations')
const {user} = require('../models') 
const bycypt =require('bcrypt');

router.get('/users', async (req,res)=>{
    try{
        const users = await User.findAll({
            attribute: {exclude : ['password']},
        });
        res.json(users);
    }catch (err){}
})

router.post('/signup',async(req,res)=>{
    console.log(req.body)
    try{
        const {email,password,userName,phone,address,userType} = await signupValidation.validateAsync(
            req.body
        );
        const hashedPassword = await bycypt.hash(password, 12)
        const User = await user.create({
            email,
            password:hashedPassword,
            userName,
            phone,
            address,
            userType,
    })
    res.json(User)

    }catch (err){
        if(err.isJoi){
            return res.status(422).json({message: error.details[0].message});
        }
        res.status(500).json({message: err.message})
    }
});

module.exports = router; 