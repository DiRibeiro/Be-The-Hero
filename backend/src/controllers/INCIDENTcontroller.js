const connect = require('../database/connection')

module.exports = {
    async index(req, res) {
        const { page = 1 } = req.query //Cria page caso não exista
        
        const [count] = await connect('incidents')
            .count()

        const incidents = await connect('incidents')
            .join('ongs', 'ongs_id', '=', 'incidents.ong_id')
            .limit(5)                   //Limita a quantidade de exibição
            .offset((page - 1) * 5)     //Começa apartir do 0 e de 5 em 5
            .select(
                'incidents.*',
                'ongs.name',
                'ong.email',
                'ong.whatsapp',
                'ong.city',
                'ong.uf'
            )

        res.header('X-Total-Count', count['count(*)'])
        return res.json(incidents)
    },

    async create(req, res) {
        const { title, description, value } = req.body
        const ong_id = req.headers.authorization

        const [id] = await connect('incidents').insert({
            title,
            description,
            value,
            ong_id,
        })
        return res.json({ id })
    },

    async delete(req, res) {
        const {id} = req.params
        const ong_id = req.headers.authorization

        const incident = await connect('incidents')
            .where('id', id)
            .select('ong_id')
            .first()

            if (incident.ong_id != ong_id) {
                return res.status(401).json({ error: 'Operation nor permitted.'})
            }

            await connect('incidents').where('id', id).delete()

            return res.status(204).send()
    }
}