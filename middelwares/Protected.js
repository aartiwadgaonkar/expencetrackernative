const jwt = require("jsonwebtoken")
exports.protected = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({
                message: "please provide token"
            })
        }
        // console.log(req.headers.authorization);
        const verify = jwt.verify(req.headers.authorization, "JWT_PASSWORD")
        // console.log(verify);
        next()
    } catch (error) {
        // console.log(error);
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                message: "Invalid token"
            })
        }
        res.status(401).json({
            message: "something went wrong " + error.message, error
        })
    }
}