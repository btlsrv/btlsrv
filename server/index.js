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
let userCtrl = require('./controllers.js/userCtrl')

let { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env

app.use(express.json())
app.use( express.static( `${__dirname}/../build` ) )

player1Id = ''

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    const io = socket(app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`)))

    io.on('connection', client => {
        client.leave(client.id)

        // Creating rooms and games //
        
        client.on('createRoom', data => {
            let { room } = data
            client.join(room)
            io.emit('roomsGot', io.sockets.adapter.rooms)
        })


        client.on('sendMapToPlayer2', (data) => {
            let { room, map1 } = data
            client.in(room).emit('mapSentToPlayer2', map1)
        })

        // Joining rooms and games //

        client.on('joinRoom', data => {
            let { room } = data
            client.join(room)
        })

        client.on('joinGame', async data => {
            let { map2, room } = data
            io.in(room).emit('gameJoined', {map2})
            player1 = '',
            io.emit('roomsGot', io.sockets.adapter.rooms)
        })

        // Gameplay

        client.on('changeTurns', data => {
            let { currentTurn, room, spotSelected } = data
            io.in(room).emit('turnsChanged', {currentTurn, spotSelected})
        })


        // get rooms for lobby
        
        client.on('getRooms', () => {
            io.emit('roomsGot', io.sockets.adapter.rooms)
        })

        // Leave game or win game

        client.on('gameOver', data => {
            console.log(data)
            let { room, winner } = data
            io.in(room).emit('endGame', winner)
            client.leave(room)
            io.emit('roomsGot', io.sockets.adapter.rooms)
        })

        client.on('leaveGame', data => {
            let { room, player } = data
            client.leave(room)
            client.in(room).emit('playerLeft', player)
            io.emit('roomsGot', io.sockets.adapter.rooms)
        })

        client.on('leaveRoom', room => {
            client.leave(room)
            io.emit('roomsGot', io.sockets.adapter.rooms)
        })

        client.on('disconnect', () => {
            console.log('disconnected')
            io.emit('roomsGot', io.sockets.adapter.rooms)
        })
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

//// User Endpoint ////
app.post('/api/victories', userCtrl.increaseVictories)
app.post('/api/defeats', userCtrl.increaseDefeats)
app.get('/api/users', userCtrl.getTopTenUsers)