/*
  At the MySql database layer, we can't use async/await because the mysql
  module works only with callbacks for returned data. Each database access
  method returns a Promise that resolves once the query has executed, or
  rejects if it was a failure.
*/

const { getDb } = require('./mysql-db');
const mysql = require('mysql')


function getPeople () {
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

function getPerson (personId) {
  var database = getDb()
  var statement = "SELECT * FROM People WHERE personId = ?"
  //var values = [personId]
  statement = mysql.format(statement, personId)

  return new Promise( (resolve, reject) => {
    database.query(statement, function (err, results) {
      if (err) {
        return reject(err)
      }
      resolve(results)
    })
  })
}

function updatePerson (personId, personInfo) {
  var database = getDb()
  var { name, company, job, salary } = personInfo
  var statement = "UPDATE People SET name = ?, company = ?, job = ?, salary = ? WHERE personId = ?"
  var values = [name, company, job, salary, personId]
  statement = mysql.format(statement, values)

  return new Promise( (resolve, reject) => {
    database.query(statement, function (err, results) {
      if (err) {
        return reject(err)
      }
      resolve(results.affectedRows)
    })
  })
}

function createPerson (personInfo) {
  var database = getDb()
  var { name, company, job, salary } = personInfo
  var statement = "INSERT INTO People (name, company, job, salary) VALUES (?, ?, ?, ?)"
  var values = [name, company, job, salary]
  statement = mysql.format(statement, values)

  return new Promise( (resolve, reject) => {
    database.query(statement, function (err, results) {
      if (err) {
        return reject(err)
      }
      resolve(results.insertId)
    })
  })
}

function deletePerson (personId) {
  var database = getDb()
  //TODO: must validate personId or else could delete all rows
  var statement = "DELETE FROM People WHERE personId = ?"
  statement = mysql.format(statement, personId)

  return new Promise( (resolve, reject) => {
    database.query(statement, function (err, results) {
      if (err) {
        return reject(err)
      }
      resolve(results.affectedRows)
    })
  })
}

function searchByFields (fields) {
  //console.log(fields)
  //console.log(typeof(fields))
  //console.log(Object.keys(fields).length)
  var len = Object.keys(fields).length
  var fieldNames = Object.keys(fields)
  escapedValues = []
  var database = getDb()
  var sql = "SELECT * FROM People WHERE"
  for (var i=0; i < len; i++) {
    sql = sql.concat(" ", fieldNames[i], "  = ?")
    escapedValues.push(fields[fieldNames[i]])
    if (i+1 != len) {sql = sql.concat(" OR")}
  }
  statement = mysql.format(sql, escapedValues)
  //console.log(statement)
  return new Promise( (resolve, reject) => {
    database.query(statement, function (err, results) {
      if (err) {
        return reject(err)
      }
      resolve(results)
    })
  })
}

function searchPeople (searchTerm, callback) {
  var database = getDb()
  var statement = "SELECT * FROM People WHERE name LIKE ? OR company LIKE ? OR job LIKE ?"
  var matcher = "%25" + searchTerm + "%25"
  var values = [matcher, matcher, matcher]
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

function removeAllPeople () {
  var database = getDb()
  var statement = "TRUNCATE TABLE People"

  return new Promise( (resolve, reject) => {
    database.query(statement, function (err, results) {
      if (err) {
        return reject(err)
      }
      resolve(results.affectedRows)
    })
  })
}


function errorHandler (err) {
	console.log(err)
}

module.exports = {
  getPeople,
  getPerson,
  updatePerson,
  createPerson,
  deletePerson,
  searchByFields,
  searchPeople, 
  removeAllPeople
}
