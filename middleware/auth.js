

require('dotenv').config()

const jwt = require("jsonwebtoken")

const auth = (req,res,next)=>{
    const token  = req.headers?.authorization?.split(" ")[1]

    if(token){
        const decoded = jwt.verify(token,process.env.jwtpasscode)

        if(decoded){
            
            if(!req.body.Userid){
                req.body.Userid=decoded.Userid
            }
            next()
        }
    }
}

module.exports = {auth}