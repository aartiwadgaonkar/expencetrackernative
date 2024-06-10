const mongoose = require("mongoose")

const accoutShema = mongoose.Schema({
    // name: String
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true,enum:["credit","debit"]
    },
   
})

module.exports = mongoose.model("account", accoutShema)