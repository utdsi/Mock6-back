
const express = require("express")

require('dotenv').config()

const bookingRouter = express.Router()

const {BookingModel} = require("../model/booking.model")

bookingRouter.post("/api/booking",async(req,res)=>{

    const userid = req.body.userid

    try {
        let booking = new BookingModel({user:userid,...req.body})

        await booking.save()

        res.status(201).send("booking done")
    } catch (error) {

        console.log(error)
        
    }

})

bookingRouter.get("/api/dashboard",async (req,res)=>{

    let booking = await BookingModel.find()

    res.status(201).send(booking)

})



module.exports = {bookingRouter}


