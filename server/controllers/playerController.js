const {Player} = require('../models/models')
const ApiError = require('../error/ApiError')

class PlayerController {
    async create(req, res) {
        const {name_1, name_2, commandId, sex, image} = req.body
        const player = await Player.create({name_1, name_2, commandId, sex, image})
        return res.json(player)
    }

    async getAll(req, res) {
        const players = await Player.findAll()
        return res.json(players)
    }

    async getOne(req, res) {
        const {id} = req.params
        if (!id) res.status(400).json({message: 'Id не указан'})
        const player = await Player.findByPk(id)
        return res.json(player)

    }

    async update(req, res) {
        const player = req.body
        if (!player.id) res.status(400).json({message: 'Id не указан'})
        const uptatedPlayer = await Player.update(team, {returning: true, where: {id: player.id}}).then(function([ rowsUpdate, [updated] ]) {
            res.json(updated)
        })
        return res.json(uptatedPlayer)
    }

    async delete(req, res) {
        const {id} = req.params
        if (!id) res.status(400).json({message: 'Id не указан'})
        const player = await Player.destroy({where: {id: id}})
        return res.json(player)
    }
}

module.exports = new PlayerController()