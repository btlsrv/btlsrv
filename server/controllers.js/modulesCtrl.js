module.exports = {
    createModules: async (req, res) => {
        try {
            const db = req.app.get('db')
            const {
                map_id,
                m2_position1,
                m2_position2,
                m3a_position1,
                m3a_position2,
                m3a_position3,
                m3b_position1,
                m3b_position2,
                m3b_position3,
                m4_position1,
                m4_position2,
                m4_position3,
                m4_position4,
                m5_position1,
                m5_position2,
                m5_position3,
                m5_position4,
                m5_position5,
                name
            } = req.body

            let modules = await db.modules.create_module({
                map_id,
                m2_position1,
                m2_position2,
                m3a_position1,
                m3a_position2,
                m3a_position3,
                m3b_position1,
                m3b_position2,
                m3b_position3,
                m4_position1,
                m4_position2,
                m4_position3,
                m4_position4,
                m5_position1,
                m5_position2,
                m5_position3,
                m5_position4,
                m5_position5,
                name
            })

            res.status(200).send(modules)
        } catch (error) {
            console.log('there was an error', error)
            res.status(500).send(error)
        }
    }
}