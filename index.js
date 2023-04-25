const express = require("express")

const app = express()
app.use(express.json())
require('dotenv').config()

const {connection} = require("./config/db.js")
const {userRouter} = require("./routes/users.route.js")
const {flightRouter} = require("./routes/flight.route.js")

app.get("/",(req,res)=>{
    res.send("welcome to airticket booking system")
})

app.use("/",userRouter)
app.use("/",flightRouter)


app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connecion to db established")
    } catch (error) {

        console.log({"error in connecting db":error})
        
    }

    console.log(`listening on port ${process.env.port}`)
})