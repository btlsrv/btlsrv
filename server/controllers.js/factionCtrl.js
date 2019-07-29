module.exports = {
    getFactionUsers: async (req, res) => {
        try {
            const db = req.app.get('db')
            const { faction_id } = req.session.user
            let users = await db.faction.get_all_users_by_factions(faction_id)

            res.status(200).send(users)
        } catch (error) {
            console.log('there was an error', error)
            res.status(500).send(error)
        }
    }
}