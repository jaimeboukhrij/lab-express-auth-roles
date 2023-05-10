const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const { isLoggedIn } = require("../middlewares/route-guard")
const saltRounds = 10


router.get("/list", isLoggedIn, (req, res, next) => {
    User
        .find()
        .then(user => res.render("students/students-list", { user }))
        .catch(err => console.log(err))
})

router.get("/:id", (req, res, next) => {
    const { id } = req.params
    const userRole = {
        isPM: req.session.currentUser?.role === 'PM',
        isOwner: req.session.currentUser?._id === id
    }
    User
        .findById(id)
        .then(student => res.render("students/student-detail", { student, userRole }))
        .catch(err => console.log(err))
})

router.get("/edit/:id", (req, res, next) => {
    const userRole = {
        isPM: req.session.currentUser?.role === 'PM',
        isDev: req.session.currentUser?.role === 'DEV',
        isTA: req.session.currentUser?.role === 'TA'
    }
    const { id } = req.params
    User
        .findById(id)
        .then(student => res.render("students/students-edit", { student, userRole }))
        .catch(err => console.log(err))

})

router.post("/edit/:id", (req, res, next) => {
    const { email, username, name, role, profileImg, description } = req.body
    const { id } = req.params
    User
        .findByIdAndUpdate(id, { email, username, name, role, profileImg, description })
        .then(() => res.redirect("/students/list"))
        .catch(err => console.log(err))
})


router.post("/delete/:id", (req, res, next) => {
    const { id } = req.params
    User
        .findByIdAndRemove(id)
        .then(() => res.redirect("/students/list"))
        .catch(err => console.log(err))
})

router.get("/perfil/:id", isLoggedIn, (req, res, next) => {

    User
        .findById(req.session.currentUser._id)
        .then(student => {
            console.log(student)
            res.render("students/students.profile.hbs", { student })
        })
        .catch(err => console.log(err))

})









module.exports = router
