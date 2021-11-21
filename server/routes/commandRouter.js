const Router = require('express')
const router = new Router()
const commandController = require('../controllers/commandController')

router.post('/', commandController.create)
router.get('/', commandController.getAll)
router.get('/:id', commandController.getOne)
router.put('/', commandController.update)
router.delete('/:id', commandController.delete)

module.exports = router