module.exports = {
    getAllUserMaps: async (req, res) => {
        try {
            const db = req.app.get('db')
            const { user_id } = req.session.user
            let maps = await db.maps.get_all_user_maps(user_id)
            res.status(200).send(maps)
        } catch (error) {
            console.log('there was an error', error)
            res.status(500).send(error)
        }
    },

    getMap: async (req, res) => {
        try {
            const db = req.app.get('db')
            const { id: map_id } = req.params
            let map = await db.maps.get_user_map(map_id)
            map = map[0]

            res.status(200).send(map)
        } catch (error) {
            console.log('there was an error', error)
            res.status(500).send(error)
        }
    },

    createMap: async (req, res) => {
        try {
            const db = req.app.get('db')
            const { user_id } = req.session.user
            let maps = await db.maps.create_map(user_id)

            res.status(200).send(maps)
        } catch (error) {
            console.log('there was an error', error)
            res.status(500).send(error)
        }
    },

    deleteMap: async (req, res) => {
        try {
            const db = req.app.get('db')
            const { map_id } = req.params

            let maps = await db.maps.delete_map(map_id)

            res.status(200).send(maps)
        } catch (error) {
            console.log('there was an error', error)
            res.status(500).send(error)
        }
    }
}