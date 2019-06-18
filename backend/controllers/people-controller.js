const { peopleService } = require('../services')

async function getPeopleCtrl (req, res) {
  //console.log(req)
  try {
    const result = await peopleService.getPeople()
    sendResponse(result, res)
  } catch(err) {
    console.log(err);
    res.sendStatus(400) // BAD REQUEST
    }
}

async function getPersonCtrl (req, res) {
  var personId = req.params.personId
  try {
    const result = await peopleService.getPerson(personId)
    sendResponse(result, res)
  } catch(err) {
    console.log(err);
    res.sendStatus(400) // BAD REQUEST
    }
}

async function updatePersonCtrl (req, res) {
  var personId = req.params.personId
  var personInfo = req.body
  try {
    const result = await peopleService.updatePerson(personId, personInfo)
    sendResponse(result, res)
  } catch(err) {
    console.log(err);
    res.sendStatus(400) // BAD REQUEST
  }
}

async function createPersonCtrl (req, res) {
  var personInfo = req.body
  try {
    const result = await peopleService.createPerson(personInfo)
    sendResponse(result, res)
  } catch(err) {
    console.log(err);
    res.sendStatus(400) // BAD REQUEST
  }

}

async function deletePersonCtrl (req, res) {
  var personId = req.params.personId
  try {
    const result = await peopleService.deletePerson(personId)
    sendResponse(result, res)
  } catch(err) {
    console.log(err);
    res.sendStatus(400) // BAD REQUEST
  }

}

async function searchByParamsCtrl(req, res) {
  try {
    const result = await peopleService.searchByAttributes(req.query)
    sendResponse(result, res)
  } catch(err) {
    console.log(err);
    res.sendStatus(400) // BAD REQUEST
  }

}


function sendResponse(result, res) {
  var meta = result.meta
  if (meta.invalid) {
    res.sendStatus(400) // BAD REQUEST
  } else if (meta.error) {
    res.sendStatus(500) // Internal Server Error
  } else if (meta.notFound) {
    res.sendStatus(404) // Not Found
  } else if (meta.created) {
    res.set('Content-Location', '/api/people/' + result.contents.personId)
    res.status(201).json(result.contents)
  } else if (meta.updated) {
    res.set('Content-Location', '/api/people/' + result.contents.personId)
    res.sendStatus(204)
  } else if (result.contents == null) {
    res.sendStatus(204) // No Content
  } else {
    res.status(200).json(result.contents)
  }

}

module.exports = {
  getPeopleCtrl,
  getPersonCtrl,
  updatePersonCtrl,
  createPersonCtrl,
  deletePersonCtrl,
  searchByParamsCtrl,
}
