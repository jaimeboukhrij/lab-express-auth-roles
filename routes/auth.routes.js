const router = require("express").Router()
const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const { isLoggedOut } = require("../middlewares/route-guard")
const saltRounds = 10

// Signup
router.get('/registro', isLoggedOut, (req, res, next) => res.render('auth/signup'))
router.post('/registro', (req, res, next) => {

  const { email, userPwd, username, name, profileImg, description } = req.body
  bcrypt
    .genSalt(saltRounds)
    .then(salt => bcrypt.hash(userPwd, salt))
    .then(hashedPassword => User.create({ email, username, name, profileImg, description, password: hashedPassword }))
    .then(createdUser => res.redirect('/'))
    .catch(error => next(error))
})
// Login
router.get('/iniciar-sesion', isLoggedOut, (req, res, next) => res.render('auth/login'))
router.post('/iniciar-sesion', (req, res, next) => {
  const { email, userPwd } = req.body
  User
    .findOne({ email })
    .then(user => {
      if (!user) {
        res.render('auth/login', { errorMessage: 'Email no registrado en la Base de Datos' })
        return
      } else if (bcrypt.compareSync(userPwd, user.password) === false) {
        res.render('auth/login', { errorMessage: 'La contraseña es incorrecta' })
        return
      } else {
        req.session.currentUser = user
        res.redirect('/')
      }
    })
    .catch(error => next(error))
})

// Logout
router.post('/cerrar-sesion', (req, res, next) => {
  req.session.destroy(() => res.redirect('/iniciar-sesion'))
})
module.exports = router

//

