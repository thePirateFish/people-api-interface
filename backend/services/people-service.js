const { personDb } = require('../db')
const { getPeopleDb, getPersonDb } = personDb

async function getPeopleService (callback) {

  /*const peoplePromise = getPeopleDb()
  peoplePromise
    .then(results => {
      const formatted = formatResults(results)
      callback(null, formatted)
    })
    .catch(err => callback(err))*/

  try {
    let people = await getPeopleDb()
    people = formatResults(people)
    callback(null, people)
  } catch (err) {
    return callback("Unknown error occurred")
  }

}

async function getPersonService (personId, callback) {
  try {
    let person = await getPersonDb(personId)
    person = formatResults(person)
    callback(null, person)
  } catch (err) {
    return callback(err)
  }
}

const updatePersonService = function (personId, callback) {

}

const createPersonService = function (person, callback) {

}

const deletePersonService = function (personId, callback) {

}

const searchPeopleService = function (searchTerms, callback) {

}

function formatResults(results) {
  return JSON.parse(JSON.stringify(results))
}

module.exports = {
  getPeopleService: getPeopleService,
  getPersonService,
  updatePersonService,
  createPersonService,
  deletePersonService,
  searchPeopleService
}
