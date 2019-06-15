const { getDb } = require('./mysql-db');
const mysql = require('mysql')


function getPeopleDb () {
	// may not need to explicitly return Promise
	var database = getDb()
	var statement = "SELECT * FROM People"

	return new Promise( (resolve, reject) => {
		database.query(statement, function (err, results) {
			if (err) {
				return reject(err)
			}
			resolve(results)
		})
	})
	
}

function getPersonDb (personId) {
  var database = getDb()
  var statement = "SELECT * FROM People WHERE personId = ?"
  var values = [personId]
  statement = mysql.format(statement, values)

  return new Promise( (resolve, reject) => {
    database.query(statement, function (err, results) {
      if (err) {
        return reject(err)
      }
      resolve(results)
    })
  })
}

const updatePersonDb = function (personId, callback) {

}

const createPersonDb = function (person, callback) {

}

const deletePersonDb = function (personId, callback) {

}

const searchPeopleDb = function (searchTerms, callback) {

}

function errorHandler (err) {
	console.log(err)
}

module.exports = {
  getPeopleDb: getPeopleDb,
  getPersonDb: getPersonDb,
  updatePersonDb,
  createPersonDb,
  deletePersonDb,
  searchPeopleDb
}
