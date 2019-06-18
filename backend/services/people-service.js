const { peopleDb } = require('../db')

async function getPeople () {
  try {
    var result = createResult()
    let peopleArr = await peopleDb.getPeople()
    peopleArr = formatResults(peopleArr)
    result.contents = peopleArr
    return result
  } catch (err) {
    console.log(err)
    return createErrorResult()
  }
}

async function getPerson (personId) {
  
  try {
    var result = createResult()
    let person = await peopleDb.getPerson(personId)
    personArr = formatResults(person)
    if (personArr.length == 0) {
      result.meta.notFound = true
      return result
    }
    person = personArr.pop()
    result.contents = person
    return result
  } catch (err) {
    console.log(err)
    return createErrorResult()
  }
}

async function updatePerson (personId, personInfo) {
  try {
    var result = createResult()
    let affectedPeople = await peopleDb.updatePerson(personId, personInfo)    
    if (affectedPeople == 0) {
      //TODO create person with personId parameter supplied
      let personId = await peopleDb.createPerson(personInfo)
      let person = await getPerson(personId)
      result.meta.created = true
      result.contents = formatResults(person)
    }
    personArr = await peopleDb.getPerson(personId)
    result.contents = personArr.pop()
    result.meta.updated = true
    return result
  } catch (err) {
    console.log(err)
    return createErrorResult()
  }
}

async function createPerson (personInfo) {
  try {
    var result = createResult()
    let personId = await peopleDb.createPerson(personInfo)
    let personArr = await peopleDb.getPerson(personId)
    result.contents = formatResults(personArr.pop())
    result.meta.created = true
    return result
  } catch (err) {
    console.log(err)
    return createErrorResult()
  }
}


async function deletePerson (personId) {
  try {
    var result = createResult()
    let affectedPeople = await peopleDb.deletePerson(personId)
    affectedPeople = formatResults(affectedPeople)
    if (affectedPeople == 0) {
      result.meta.invalid = true
    }
    return result
  } catch (err) {
    console.log(err)
    return createErrorResult()
  }
}

async function searchByAttributes(attributes) {
  try {
    var result = createResult()
    if (!validateInput(attributes)) {
      result.meta.invalid = true
      return result
    }
    let people = await peopleDb.searchByFields(attributes)
    if (people) {
      result.contents = formatResults(people)
    } else {
      result.contents = []
    } 
    return result
  } catch (err) {
    console.log(err)
    return createErrorResult()
  }
}


async function removeAllPeople () {
  try {
    let results = await peopleDb.removeAllPeople()
    results = formatResults(results)
    return results
  } catch (err) {
    console.log(err)
    return createErrorResult()
  }
}

const validateInput = function (personInfo) {
  let validInputs = ['name', 'company', 'job', 'salary']
  var fields = Object.keys(personInfo)
  for (var i=0; i < fields.length; i++) {
    if (validInputs.indexOf(fields[i].toLowerCase()) < 0) {
      return false
    }
  }
  return true
}

const createResult = function () {
  var resultObject = {}
  resultObject.contents = null
  resultObject.meta = { created: false,
                        notFound: false,
                        invalid: false,
                        error: false,
                        updated: false}
  return resultObject
}

const createErrorResult = function () {
  var resultObject = createResult()
  resultObject.error = true
  return resultObject
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
  removeAllPeople
}
