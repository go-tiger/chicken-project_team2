const express = require("express")
const router = express.Router();
const{signupValidation} = require('../validations')

router.post('/signup',async(req,res)=>{
    try{
    const {email,password} = await signupValidation.validateAsync(req.body)
    req.body
    }catch (err){
        if(err.isJoi){
            return res.status(422).json({message: err.detail[0].message});
        }
        res.status.json({message: err.message})
    }
});

module.exports = router; 