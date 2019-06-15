const router = require('express').Router()
const peopleRoutes = require('./people-routes')

router.use('/api', peopleRoutes)

module.exports = [
  router
]
