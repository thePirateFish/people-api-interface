const mysql = require('mysql')
const assert = require('assert')
const config = require('../config/mysql-config.json')
const defaultConfig = config.development
let _db

function initDb (callback) {
  if (_db) {
    console.warn('Trying to init when DB is already initialized')
    return callback(null, _db)
  }

  var pool = mysql.createPool(defaultConfig)
  testConnection(pool)
  

  _db = pool
  return callback(null, _db)
}

function getDb () {
  assert.ok(_db, 'Database has not been initialized. Must call initDb first.')
  return _db
}

function testConnection (pool) {
  pool.getConnection(function (err, connection) {
    if (err) {
      createDb()
    }
  })
  createTable()
}

function createDb () {
  const connConfig = config.connection
  const dbName = config.dbName
  var conn = mysql.createConnection(connConfig)
  var statement = "CREATE DATABASE IF NOT EXISTS " + dbName
  //statement = mysql.format(statement, dbName)
  conn.query(statement, function (err, results) {
    if (err) {
      console.log("Error creating database")
    } else {
      console.log("Successfully created api database")
      conn.end(function (err) {
        if (err) {
          console.log("Error closing connection in createDb")
        }
      })
    }
  })
}

function createTable () {
  var conn = mysql.createConnection(defaultConfig)
  var statement = "CREATE TABLE IF NOT EXISTS People (personId INT AUTO_INCREMENT PRIMARY KEY, " +
                  "name VARCHAR(255), company VARCHAR(255), job VARCHAR(255), salary MEDIUMINT)" 
  conn.query(statement, function (err, results) {
      if (err) {
        console.log("Error creating People table")
      } else {
        //console.log("Successfully created People table")
        conn.end(function (err) {
        if (err) {
          console.log("Error closing connection in createTable")
        }
      })
      }
    })
}

module.exports = {
  initDb,
  getDb
}
