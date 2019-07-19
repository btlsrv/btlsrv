let express = require('express')
let massive = require('massive')
let session = require('express-session')
let app = express()
require('dotenv').config()

let { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env

app.use(express.json())

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`))
})

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365
    }
}))