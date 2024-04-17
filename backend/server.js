require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

//Init express app
const app = express()

//Middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//Routes

// No longer use since we gonna use the routes folder instead

// app.get('/', (req, res) =>{
//     res.json({mssg: 'Welcome to the app'})
// })

app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// Connect to DB
mongoose.connect(process.env.MONG_URL)
    .then(() => {
        //Listen for requests
        app.listen(process.env.PORT, () => {
        console.log('Connected to DB and Listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })
