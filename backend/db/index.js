const { initDb, getDb } = require('./mysql-db');
const personDb = require('./person-db');



module.exports = {
	initDb,
	getDb,
	personDb
}