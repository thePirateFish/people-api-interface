const { peopleService } = require('../services')

async function getPeopleCtrl (req, res) {
  //console.log(req)
  try {
    const result = await peopleService.getPeople()
    //console.log(results)
    res.status(200).json(result.contents)
  } catch(err) {
    console.log(err);
    res.sendStatus(400) // BAD REQUEST
    }
}

async function getPersonCtrl (req, res) {
  var personId = req.params.personId
  try {
    const result = await peopleService.getPerson(personId)
    //console.log(results)
    if (result.meta.notFound) {
      return res.sendStatus(404)
    } 
    res.status(200).json(result.contents)
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
    if (result.meta.created) {
      // Set Content-Location header with location of
      // newly created Person
      res.set('Content-Location', '/api/people/' + result.contents.personId)
      return res.status(201).json(result.contents) // CREATED
    }
    // Set Content-Location of updated person, no person created
    res.set('content-location', '/api/people/' + personId)
    res.sendStatus(204) // No Content, success
  } catch(err) {
    console.log(err);
    res.sendStatus(400) // BAD REQUEST
  }
}

async function createPersonCtrl (req, res) {
  var personInfo = req.body
  try {
    const result = await peopleService.createPerson(personInfo)
    if (result.meta.created) {
      res.set('Content-Location', '/api/people/' + result.contents.personId)
      return res.status(201).json(result.contents) //201 CREATED
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
    const result = await peopleService.deletePerson(personId)
    if (result.meta.affectedPeople == 1) {
      results.message = "Person deleted"
      res.status(200) //200 OK, response message added
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
    const result = await peopleService.searchByAttributes(req.query)
    sendResponse(result, res)
    /*if (result.contents != null) {
      return res.status(200).json(result.contents) //OK, returning array
    } else {
      res.sendStatus(200) //OK, but no results in body
    }*/
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
    res.status(201).json(result.contents)
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
