const router = require('express').Router()
const { peopleController } = require('../controllers')

router.get('/people', peopleController.getPeopleCtrl)
router.get('/people/:personId', peopleController.getPersonCtrl)
router.post('/people', peopleController.updatePersonCtrl)
router.put('/people/:personId', peopleController.createPersonCtrl)
router.delete('/people/:personId', peopleController.deletePersonCtrl)
router.search('/people/', peopleController.searchPeopleCtrl)

module.exports = [
  router
]
