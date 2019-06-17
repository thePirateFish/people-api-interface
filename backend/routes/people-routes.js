const router = require('express').Router()
const { peopleController } = require('../controllers')

router.get('/people', peopleController.getPeopleCtrl)
router.get('/people/:personId(\\d+)/', peopleController.getPersonCtrl)
router.get('/people/search', peopleController.searchByParamsCtrl)
router.put('/people/:personId', peopleController.updatePersonCtrl)
//router.patch('people/:personId', peopleController.patchPersonCtrl)
router.post('/people', peopleController.createPersonCtrl)
router.delete('/people/:personId', peopleController.deletePersonCtrl)
//router.search('/people/', peopleController.searchPeopleCtrl)
//TODO decide method for search

module.exports = [
  router
]
