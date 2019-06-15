const { peopleService } = require('../services')

const getPeopleCtrl = function (req, res) {
  peopleService.getPeopleService(function (err, results) {
    if (err) {
      console.log(err)
      res.sendStatus(400) // BAD REQUEST
    }
    console.log(results)
    res.status(200).json(results)
  })
}

const getPersonCtrl = function (req, res) {
  var personId = req.params.personId
  console.log("person id: " + personId)
  peopleService.getPersonService(personId, function (err, results) {
    if (err) {
      console.log(err)
      res.sendStatus(404) // NOT FOUND
    }
    console.log(results)
    res.status(200).json(results)
  })
}

const updatePersonCtrl = function (req, res) {
  var personId = req.params.personId
  var updates = req.body
  peopleService.getPersonService(personId, updates, function (err, results) {
    if (err) {
      console.log(err)
      // TODO: status 201 for created
      res.sendStatus(204) // No Content
    }
    let output = JSON.parse(JSON.stringify(results))
    res.status(200).json(output)
  })
}

const createPersonCtrl = function (req, res) {
  var person = req.body
  peopleService.getPersonService(person, function (err, results) {
    if (err) {
      console.log(err)
      res.sendStatus(204) // No content
    }
    // must return entity in body
    let output = JSON.parse(JSON.stringify(results))
    res.status(201).json(output)
  })
}

const deletePersonCtrl = function (req, res) {
  var personId = req.params.personId
  peopleService.getPersonService(personId, function (err, results) {
    if (err) {
      console.log(err)
      // TODO: status 202 for queued
      res.sendStatus(204) // No Content
    }
    // let output = JSON.parse(JSON.stringify(results));
    res.sendStatus(204) // No content, action performed but no entity sent back
  })
}

const searchPeopleCtrl = function (req, res) {

}

module.exports = {
  getPeopleCtrl,
  getPersonCtrl,
  updatePersonCtrl,
  createPersonCtrl,
  deletePersonCtrl,
  searchPeopleCtrl
}
