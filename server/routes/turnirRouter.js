const Router = require('express')
const router = new Router()
const turnirController = require('../controllers/turnirController')

router.post('/', turnirController.create)
router.get('/', turnirController.getAll)
router.get('/:id', turnirController.getOne)
router.put('/', turnirController.update)
router.delete('/:id', turnirController.delete)

module.exports = router