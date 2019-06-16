const router = require('express').Router()
const { peopleController } = require('../controllers')

router.get('/people', peopleController.getPeopleCtrl)
router.get('/people/:personId', peopleController.getPersonCtrl)
router.put('/people/:personId', peopleController.updatePersonCtrl)
//router.patch('people/:personId', peopleController.patchPersonCtrl)
router.post('/people', peopleController.createPersonCtrl)
router.delete('/people/:personId', peopleController.deletePersonCtrl)
router.search('/people/', peopleController.searchPeopleCtrl)

module.exports = [
  router
]
