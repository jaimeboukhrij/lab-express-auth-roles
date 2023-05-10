
// to seed your database, use the 'node' command followed by the filename 

const mongoose = require('mongoose')
const User = require('./../models/User.model')

const MONGO_URI = 'mongodb://localhost/ironhack-learn'

const users = [
    {
        username: "user1",
        email: "user1@gmail.com",
        name: "Luis",
        secondName: "De la torre",
        password: "1234",
        profileImg: "https://i.pinimg.com/originals/3d/a6/df/3da6df9d7a8eb24bb3bf3568f0e84678.png",
        description: "All right"
    },
    {
        username: "user2",
        email: "user2@gmail.com",
        name: "Gloria",
        secondName: "Fuertes",
        password: "1234",
        profileImg: "https://stickerly.pstatic.net/sticker_pack/EpE633NkJy54pdwXnftzJA/TVJ7PX/43/1f32f4f2-afec-46a1-8788-5750cc7e3019.png",
        description: "Ey bro"
    },
    {
        username: "userPm",
        email: "userPm@gmail.com",
        name: "Jaime",
        secondName: "Boukhrij",
        password: "1234",
        profileImg: "https://stickerly.pstatic.net/sticker_pack/chFOsiBEHmprfgMBqw/8VJCQ5/6/085dddbf-a8c4-4381-8c97-34f13410f52e.png",
        description: "The Boss"
    }

]

mongoose
    .connect(MONGO_URI)
    .then(x => {
        console.log(`Connected to Mongo database: "${x.connections[0].name}"`)
        return User.create(users)
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