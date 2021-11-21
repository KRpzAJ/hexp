const Router = require('express')
const commandRouter = require('./commandRouter')
const gameRouter = require('./gameRouter')
const playerRouter = require('./playerRouter')
const sportRouter = require('./sportRouter')
const turnirRouter = require('./turnirRouter')

const router = new Router()

router.use('/team', commandRouter)
router.use('/game', gameRouter)
router.use('/player', playerRouter)
router.use('/sport', sportRouter)
router.use('/turnir', turnirRouter)
//router.use('/user')

module.exports = router