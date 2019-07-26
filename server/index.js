let express = require('express')
let massive = require('massive')
let session = require('express-session')
let app = express()
require('dotenv').config()
let socket = require('socket.io')

let authCtrl = require('./controllers.js/authCtrl')
let mapCtrl = require('./controllers.js/mapCtrl')
let modulesCtrl = require('./controllers.js/modulesCtrl')
let messagesCtrl = require('./controllers.js/messageCtrl')
let factionCtrl = require('./controllers.js/factionCtrl')

let { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env

app.use(express.json())

let player1 = ''

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    const io = socket(app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`)))

    io.on('connection', client => {
        console.log('connected')

        client.leave(client.id)

        // Creating rooms and games //
        
        client.on('createRoom', data => {
            console.log('room created')
            let { room } = data
            client.join(room)
            io.emit('roomsGot', io.sockets.adapter.rooms)
        })

        client.on('startGame', data => {
            let { player1Map } = data
            console.log('started')
            player1 = player1Map
            console.log(player1)
        })

        // Joining rooms and games //

        client.on('joinRoom', data => {
            console.log('room joined')
            let { room } = data
            client.join(room)
        })

        client.on('joinGame', async data => {
            let { player2Map, room } = data
            console.log(data)
            console.log('game joined')
            io.in(room).emit('gameJoined', { player1, player2Map })
            player1 = '',
            io.emit('roomsGot', io.sockets.adapter.rooms)
        })

        // Gameplay

        client.on('changeTurns', data => {
            let { currentTurn, room } = data
            io.in(room).emit('turnsChanged', currentTurn)
        })

        // Leave game or disconnect

        client.on('leaveGame', room => {
            client.leave(room)
            client.in(room).emit('playerLeft')
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

//// Auth Endpoints ///
app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.get('/auth/logout', authCtrl.logout)
app.get('/auth/getuser', authCtrl.currentUser)

//// Map Endpoints ///
app.post('/api/maps', mapCtrl.createMap)
app.get('/api/maps', mapCtrl.getAllUserMaps)
app.get('/api/maps/:id', mapCtrl.getMap)
app.delete('/api/maps/:id', mapCtrl.deleteMap)

//// Modules Endpoint ////
app.post('/api/modules', modulesCtrl.createModules)

//// Messages Endpoints ////
app.post('/api/messages', messagesCtrl.createMessage)
app.get('/api/messages', messagesCtrl.getAllMessages)
app.delete('/api/messages/:id', messagesCtrl.deleteMessage)

//// Faction Endpoint ////
app.get('/api/faction', factionCtrl.getFactionUsers)