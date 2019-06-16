const { initDb, getDb } = require('./mysql-db')
const peopleDb = require('./people-db')

module.exports = {
  initDb,
  getDb,
  peopleDb
}
