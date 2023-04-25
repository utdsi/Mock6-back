

const mongoose = require("mongoose")
const {UserModel} = require('./users.model')
const {FlightModel} = require("./flight.model")

const bookingSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },
    flight: { type: mongoose.Schema.Types.ObjectId, ref: 'FlightModel' }
})


const BookingModel = mongoose.model("booking", bookingSchema)


module.exports = { BookingModel }

