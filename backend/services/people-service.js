const { peopleDb } = require('../db')

async function getPeople () {
  try {
    let results = await peopleDb.getPeople()
    results = formatResults(results)
    return results
  } catch (err) {
    //TODO: Error handling
    console.log(err)
  }
}

async function getPerson (personId) {
  try {
    let results = await peopleDb.getPerson(personId)
    results = formatResults(results)
    return results
  } catch (err) {
    //TODO: Error handling
    console.log(err)
  }
}

async function updatePerson (personId, personInfo) {
  try {
    let affectedPeople = await peopleDb.updatePerson(personId, personInfo)
    results = []
    
    if (affectedPeople == 0) {
      console.log("Creating new person")
      let results = await peopleDb.createPerson(personInfo)
    }
    // results.created will be set to true if created
    console.log(results)
    return results
  } catch (err) {
    //TODO: Error handling
    console.log(err)
  }
}

async function createPerson (personInfo) {
  try {
    let personId = await peopleDb.createPerson(personInfo)
    let person = await peopleDb.getPerson(personId)
    results = formatResults(person)
    return results
  } catch (err) {
    //TODO: Error handling
    console.log(err)
  }
}


async function deletePerson (personId) {
  try {
    let results = await peopleDb.deletePerson(personId)
    results = formatResults(results)
    return results
  } catch (err) {
    //TODO: Error handling
    console.log(err)
  }
}

async function searchPeople (searchTerms) {
  try {
    let results = await peopleDb.searchPeople(searchTerms)
    results = formatResults(results)
    return results
  } catch (err) {
    //TODO: Error handling
    console.log(err)
  }
}

function formatResults(results) {
  return JSON.parse(JSON.stringify(results))
}

module.exports = {
  getPeople,
  getPerson,
  updatePerson,
  createPerson,
  deletePerson,
  searchPeople
}
