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
    let resultsArr = formatResults(results)
    var person = resultsArr.pop()
    return person
  } catch (err) {
    //TODO: Error handling
    console.log(err)
  }
}

async function updatePerson (personId, personInfo) {
  try {
    let affectedPeople = await peopleDb.updatePerson(personId, personInfo)
    results = {}
    
    if (affectedPeople == 0) {
      console.log("Creating new person")
      //TODO create person with personId parameter supplied
      let results = await peopleDb.createPerson(personInfo)
    }
    // results.created will be set to true if created
    //console.log(results)
    return results
  } catch (err) {
    //TODO: Error handling
    console.log(err)
  }
}

async function createPerson (personInfo) {
  try {
    results = {}
    let personId = await peopleDb.createPerson(personInfo)
    let person = await getPerson(personId)
    results.person = person
    results.created = true
    return results
  } catch (err) {
    //TODO: Error handling
    console.log(err)
  }
}


async function deletePerson (personId) {
  try {
    let affectedPeople = await peopleDb.deletePerson(personId)
    affectedPeople = formatResults(affectedPeople)
    return affectedPeople
  } catch (err) {
    //TODO: Error handling
    console.log(err)
  }
}

async function searchByAttributes(attributes) {
  try {
    let results = await peopleDb.searchByFields(attributes)
    if (results) {
      results = formatResults(results)
      return results
    } else {
      results = []
      return results
    } 
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

async function removeAllPeople () {
  try {
    let results = await peopleDb.removeAllPeople()
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
  searchByAttributes,
  searchPeople,
  removeAllPeople
}
