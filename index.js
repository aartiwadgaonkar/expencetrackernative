const express = require("express")
const { connectMongo } = require("./config/db")
require("dotenv").config({ path: "./config/.env" })
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
connectMongo()
app.use(express.json())
app.use(cors())
app.use("/user", require("./routes/userRoutes"))
app.use("/account", require("./routes/accountRoute"))

mongoose.connection.once("open", () => {
    console.log(`Db connected`);
    app.listen(process.env.PORT, err => {
        if (err) {
            console.log("unable to start", err);
        } else {
            console.log(`server running http://localhost:${process.env.PORT}`);
        }
    })
})
app.use("*",(req,res)=>{res.status(404).json({message:"resourse not found "})})
app.use((err,req,res,next)=>{res.status(500).json({message:"server error",error:err.message})})
mongoose.connection.on("error", err => {
    console.log(`unable to connect mongo`, err);
})

