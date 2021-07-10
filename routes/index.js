const router = require('express').Router()

router.use('/bookvaccine', require('./bookvaccine.route'))

module.exports = router