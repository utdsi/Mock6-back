
const express = require("express")

require('dotenv').config()

const flightRouter = express.Router()

const { FlightModel } = require("../model/flight.model.js")

flightRouter.get("/api/flights", async (req, res) => {

    const flights = await FlightModel.find()

    res.status(200).send(flights)

})

flightRouter.get("/api/flights/:id", async (req, res) => {

    const id = req.params.id

    const flight = await FlightModel.find({ _id: id })

    res.send(flight)

})

flightRouter.post("/api/addflight", async (req, res) => {

    const payload = req.body

    const new_flight = new FlightModel(payload)

    await new_flight.save()

    res.status(201).send("flight created successfully")
})

flightRouter.patch("/api/edit/:id", async (req, res) => {

    try {

        const payload = req.body

        const id = req.params.id

       const flight =  await FlightModel.findByIdAndUpdate({ _id: id }, payload)

        res.send("flight updated sucessfully")



    } catch (error) {

        console.log(error)

    }






})


flightRouter.delete("/api/delete/:id", async (req, res) => {

    try {

        

        const id = req.params.id

        await FlightModel.findByIdAndDelete({ _id: id })

        res.send("flight deleted sucessfully")



    } catch (error) {

        console.log(error)

    }






})

module.exports = { flightRouter }