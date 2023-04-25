
const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require('dotenv').config()

const userRouter = express.Router()

const{UserModel} = require("../model/users.model.js")

userRouter.post("/api/register",async (req,res)=>{

    const {name,email,password} = req.body

    try {
        bcrypt.hash(password, 6, async function(err, hash) {
            // Store hash in your password DB.

            if(err){
                console.log({"error in hashing":err})
            }else{

                const user = await new UserModel({name,email,password:hash})
                await user.save()
                res.status(201).send("signup successfull")
            }
        });
    } catch (error) {

        console.log(error)
        
    }
})

userRouter.post("/api/login",async(req,res)=>{

    const {email,password} = req.body

    try {
        
        const user = await UserModel.findOne({email})

        if(user){

            const hash_password = user.password

            bcrypt.compare(password, hash_password, function(err, result) {
                // result == false
                if(result){
                    const token = jwt.sign({ "userId":user._id }, process.env.jwtpasscode)

                    res.status(201).send({"msg":"login successfull","token":token})
                }else{
                    res.send("login failed")
                }
            });

        }
        else{
            res.send("login failed")
        }
    } catch (error) {

        console.log({"error in login":error})
        
    }


})


module.exports = {userRouter}