const { getAllregisterUsers, registerUser, destroyUsers, loginUser } = require("../controller/userController")

const router = require("express").Router()
const { protected } = require("./../middelwares/Protected")
router
    .get("/", protected, getAllregisterUsers)
    .post("/register", registerUser)
    .post("/login", loginUser)
    .delete("/destroy", destroyUsers)

module.exports = router