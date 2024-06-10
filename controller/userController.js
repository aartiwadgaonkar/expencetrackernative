const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.registerUser = async (req, res) => {
    try {
        console.log(req.body);
        const { password, email } = req.body
        const found = await User.findOne({ email: email })
        console.log(found);
        if (found) {
            return res.status(400).json({
                message: "email already  exist",

            })
        }
        const hashPassword = bcrypt.hashSync(password, 10)
        console.log(hashPassword, "hash");
        const result = await User.create({ ...req.body, password: hashPassword })
        res.json({
            message: "user register successfulyy",

        })
    } catch (error) {
        res.status(400).json({
            message: "unable to register " + error.message
        })

    }
}
exports.getAllregisterUsers = async (req, res) => {
    try {
        const result = await User.find()
        res.json({
            message: "user fetched successfulyy",
            result
        })
    } catch (error) {
        res.json({
            message: "unable to fetch " + error.message
        })

    }
}

exports.loginUser = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({
                message: `All feilds required`
            })
        }
        const result = await User.findOne({ email: req.body.email })
        if (!result) {
            return res.status(400).json({
                message: `${req.body.email} is not registered with us`
            })
        }
        const compare = await bcrypt.compare(req.body.password, result.password)
        if (!compare) {
            return res.status(400).json({
                message: `Invalid password`
            })
        }
        const token = jwt.sign({
            name: result.name,
            id: result._id,
        }, "JWT_PASSWORD")
        res.json({
            message: "user login success",
            result, token
        })
    } catch (error) {
        res.json({
            message: "something went wrong" + error.message,

        })
    }
}
exports.destroyUsers = async (req, res) => {
    try {
        const result = await User.deleteMany()
        res.json({
            message: "user Data destroyed",
            result
        })
    } catch (error) {
        res.json({
            message: "something went wrong" + error.message,

        })
    }
}