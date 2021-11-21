const {Turnir} = require('../models/models')
const ApiError = require('../error/ApiError')

class TurnirController {
    async create(req, res) {
        const {name, image} = req.body
        const turnir = await Turnir.create({name, image})
        return res.json(turnir)
    }

    async getAll(req, res) {
        const turnirs = await Turnir.findAll()
        return res.json(turnirs)
    }

    async getOne(req, res) {
        const {id} = req.params
        if (!id) res.status(400).json({message: 'Id не указан'})
        const turnir = await Turnir.findByPk(id)
        return res.json(turnir)

    }

    async update(req, res) {
        const turnir = req.body
        if (!turnir.id) res.status(400).json({message: 'Id не указан'})
        const uptatedTurnir = await Turnir.update(turnir, {returning: true, where: {id: turnir.id}}).then(function([ rowsUpdate, [updated] ]) {
            res.json(updated)
        })
        return res.json(uptatedTurnir)
    }

    async delete(req, res) {
        const {id} = req.params
        if (!id) res.status(400).json({message: 'Id не указан'})
        const turnir = await Turnir.destroy({where: {id: id}})
        return res.json(turnir)
    }
}

module.exports = new TurnirController()