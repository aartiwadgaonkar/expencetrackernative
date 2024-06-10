const mongoose = require("mongoose")
exports.connectMongo = () => {
mongoose.connect(process.env.MONGO_URL)
}