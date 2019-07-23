let express = require('express')
let massive = require('massive')
let session = require('express-session')
let app = express()
require('dotenv').config()
let socket = require('socket.io')

let authCtrl = require('./controllers.js/authCtrl')

let { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env

app.use(express.json())

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    const io = socket(app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`)))

    io.on('connection', client => {
        let gameRoom = 1

        client.on('startGame', () => {
            let room = gameRoom
            client.join(room)
            io.in(room).emit('startedGame', { gameRoom })
            gameRoom += 1
        })

        client.on('getRooms', () => {
            client.emit('roomsGot', io.sockets.adapter.rooms)
        })

        client.on('disconnect', () => console.log('user disconnected'))
    })
})

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365
    }
}))

app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)
app.get('/auth/getuser', authCtrl.currentUser)