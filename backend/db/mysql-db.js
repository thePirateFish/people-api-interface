const mysql = require('mysql');
const config = require('../config/mysql-config.json');
const defaultConfig = JSON.parse(config.development);
let _db;

const initDb = function (callback) {
	if (_db) {
		console.warn("Trying to init when DB is already initialized");
		return callback(null, _db);
	}

	var pool = mysql.createPool(defaultConfig)
	_db = pool;
	return callback(null, _db);
}

const getDb = function () {
	assert.ok(_db, "Database has not been initialized. Must call initDb first.");
	return _db;
}


module.exports = {
	initDb,
	getDb
}