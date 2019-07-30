module.exports = {
    increaseVictories: async (req, res) => {
        try {
            const db = req.app.get('db')
            let { user_id } = req.session.user
            console.log(req.session.user)
            let victories = await db.user.increase_victory(user_id)
            res.status(200).send(victories)
        } catch (error) {
            console.log('there was an error', error)
            res.status(500).send(error)
        }
    },

    increaseDefeats: async (req, res) => {
        try {
            const db = req.app.get('db')
            let { user_id } = req.session.user
            let defeats = await db.user.increase_defeat(user_id)
            res.status(200).send(defeats)
        } catch (error) {
            console.log('there was an error', error)
            res.status(500).send(error)
        }
    }, 

    getTopTenUsers : async (req, res) => {
        try {
            const db = req.app.get('db')
            let topTen = await db.user.get_top_ten_users()
            res.status(200).send(topTen)
        } catch (error) {
            console.log('there was an error', error)
            res.status(500).send(error)
        }
    }
}