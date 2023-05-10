const router = require("express").Router()
const bcrypt = require('bcryptjs')
const Course = require("../models/Course.model")
const saltRounds = 10

router.get("/", (req, res, next) => {
    res.send("hola")
})








module.exports = router