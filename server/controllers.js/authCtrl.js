const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        try {
            const db = req.app.get('db')
            const { name, email, password, username } = req.body
    
            let users = await db.find_user_by_email(email)
            let user = users[0]
    
            if (user) {
                return res.status(409).send('email already exists')
            }
    
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)
    
            let response = await db.create_user({name, email, hash, username})
            let newUser = response[0]
    
            delete newUser.password
    
            req.session.user = newUser
            res.send(req.session.user)
            
        } catch (error) {
            console.log('error', error)
            res.status(500).send(error)
        }
    },
    login: async (req, res) => {
        try {
            const db = req.app.get('db')
            let { email, password } = req.body
    
            let users = await db.find_user_by_email(email)
            let user = users[0]
    
            if (!user) {
                return res.status(401).send('email or password incorrect')
            }

            let isAuthenticated = bcrypt.compareSync(password, user.password)

            if (!isAuthenticated) {
                return res.status(401).send('email or password incorrect')
            }

            delete user.password
            req.session.user = user
            res.send(req.session.user)
            
        } catch (error) {
            console.log('there was an error', error)
            res.status(500).send(error)
        }

    },
    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },
    currentUser: async (req, res) => {
        if (req.session.user) {
            let db = req.app.get('db')
            let {email} = req.session.user
            let users = await db.find_user_by_email(email)
            let user = users[0]
            delete user.password
            req.session.user = user
        }
        

        res.send(req.session.user)
    }
}