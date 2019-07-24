module.exports = {
    getAllMessages: async (req, res) => {
        try {
            const db = req.app.get('db')
            const { faction_id } = req.session.user
            let forums = await db.messages.get_factions_messages(faction_id)
            res.status(200).send(forums)
        } catch (error) {
            console.log('error', error)
            res.status(500).send(error)
        }
    },

    createMessage: async (req, res) => {
        try {
            const db = req.app.get('db')
            const { user_id, } = req.session.user
            const { message, forum_id } = req.body
            let messages = await db.messages.create_message({
                user_id,
                forum_id,
                message
            })
            res.status(200).send(messages)
        } catch (error) {
            console.log('error', error)
            res.status(500).send(error)
        }
    },

    deleteMessage: async (req, res) => {
        try {
            const db = req.app.get('db')
            const { id } = req.params
            console.log(id)
            let messages = await db.messages.delete_message(id)

            res.status(200).send(messages)
        } catch (error) {
            console.log('error', error)
            res.status(500).send(error)
        }
    }
}