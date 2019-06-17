const { peopleService } = require('../services')

async function getPeopleCtrl (req, res) {
  try {
    const results = await peopleService.getPeople()
    //console.log(results)
    res.status(200).json(results)
  } catch(err) {
    console.log(err);
    res.sendStatus(400) // BAD REQUEST
    }
}

async function getPersonCtrl (req, res) {
  var personId = req.params.personId
  try {
    const results = await peopleService.getPerson(personId)
    //console.log(results)
    if (results.length == 0) {
      return res.sendStatus(404)
    } 
    res.status(200).json(results)
  } catch(err) {
    console.log(err);
    res.sendStatus(400) // BAD REQUEST
    }
}

async function updatePersonCtrl (req, res) {
  var personId = req.params.personId
  var personInfo = req.body
  try {
    const results = await peopleService.updatePerson(personId, personInfo)
    //console.log(results)
    if (results.created) {
      // Set Content-Location header with location of
      // newly created Person
      res.set('Content-Location', '/api/people/' + results.person.personId)
      return res.status(201).json(results.person) // CREATED
    }
    // Set Content-Location of updated person, no person created
    res.set('content-location', '/api/people/' + personId)
    res.sendStatus(204) // No Content, success
  } catch(err) {
    console.log(err);
    res.sendStatus(400) // BAD REQUEST
  }
}

/*async function patchPersonCtrl (req, res) {
  var personId = req.params.personId
  var personInfo = req.body
  try {
    const results = await peopleService.patchPerson(personId, personInfo)
    console.log(results)
    if (results.length != 0) {
      // Set Content-Location header with location of
      // newly created Person
      res.location('/people/' + results.personId)
      return res.status(201).json(results) // CREATED
    }
    // Set Content-Location of updated person, no person created
    res.location('/people/' + personId)
    res.sendStatus(200) // OK, updated
  } catch(err) {
    console.log(err);
    res.sendStatus(400) // BAD REQUEST
  }
}*/

async function createPersonCtrl (req, res) {
  var personInfo = req.body
  try {
    const results = await peopleService.createPerson(personInfo)
    //console.log(results)
    if (results.created) {
      res.set('Content-Location', '/api/people/' + results.person.personId)
      return res.status(201).json(results.person) //201 CREATED
    }
    res.sendStatus(400) // BAD REQUEST
  } catch(err) {
    console.log(err);
    res.sendStatus(400) // BAD REQUEST
  }

}

async function deletePersonCtrl (req, res) {
  var personId = req.params.personId
  try {
    results = {}
    const affectedPeople = await peopleService.deletePerson(personId)
    if (affectedPeople == 1) {
      results.message = "Person deleted"
      res.status(200).json(results) //200 OK, response message added
    } else {
      res.sendStatus(204)
    }
  } catch(err) {
    console.log(err);
    res.sendStatus(400) // BAD REQUEST
  }

}

async function searchByParamsCtrl(req, res) {
  try {
    const results = await peopleService.searchByAttributes(req.query)
    //console.log(results)
    if (results.length != 0) {
      return res.status(200).json(results) //OK, returning array
    } else {
      res.sendStatus(200) //OK, but no results in body
    }
  } catch(err) {
    console.log(err);
    res.sendStatus(400) // BAD REQUEST
  }

}

async function searchPeopleCtrl (req, res) {
  var searchTerm = req.body
  try {
    const results = await peopleService.searchPeople(searchTerm)
    //console.log(results)
    res.status(200).json(results)
  } catch(err) {
    console.log(err);
    res.sendStatus(400) // BAD REQUEST
    }
}

module.exports = {
  getPeopleCtrl,
  getPersonCtrl,
  updatePersonCtrl,
  createPersonCtrl,
  deletePersonCtrl,
  searchByParamsCtrl,
  searchPeopleCtrl
}
