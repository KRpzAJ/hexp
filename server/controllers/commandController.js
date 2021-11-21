const {Team} = require('../models/models')
const ApiError = require('../error/ApiError')

class CommandController {
    async create(req, res) {
        const {name, nameShort, town, sex, image} = req.body
        const team = await Team.create({name, nameShort, town, sex, image})
        return res.json(team)
    }

    async getAll(req, res) {
        const teams = await Team.findAll()
        return res.json(teams)
    }

    async getOne(req, res) {
        const {id} = req.params
        if (!id) res.status(400).json({message: 'Id не указан'})
        const team = await Team.findByPk(id)
        return res.json(team)

    }

    async update(req, res) {
        const team = req.body
        if (!team.id) res.status(400).json({message: 'Id не указан'})
        const uptatedTeam = await Team.update(team, {returning: true, where: {id: team.id}}).then(function([ rowsUpdate, [updated] ]) {
            res.json(updated)
        })
        return res.json(uptatedTeam)
    }

    async delete(req, res) {
        const {id} = req.params
        if (!id) res.status(400).json({message: 'Id не указан'})
        const team = await Team.destroy({where: {id: id}})
        return res.json(team)
    }
}

module.exports = new CommandController()