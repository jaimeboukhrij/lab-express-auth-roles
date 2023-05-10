const mongoose = require('mongoose')
const Course = require('./../models/Course.model')

const MONGO_URI = 'mongodb://localhost/ironhack-learn'

const courses = [


]

mongoose
    .connect(MONGO_URI)
    .then(x => {
        console.log(`Connected to Mongo database: "${x.connections[0].name}"`)
        return Course.create(courses)
    })
    .then(booksFromDB => {
        console.log(`Created ${booksFromDB.length} books`)
        return mongoose.connection.close()
    })
    .then(() => {
        console.log('DB connection closed!')
    })
    .catch(err => {
        console.log(`An error occurred while creating books from the DB: ${err}`)
    })