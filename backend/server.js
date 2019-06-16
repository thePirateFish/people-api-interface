const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const { initDb } = require('./db')
const path = require('path')

// check PORT environment variable, otherwise 3000
const port = process.env.PORT || 3000

const app = express()
initDb(function (err) {
  if (err) {
    console.log("Error initializing Db")
  } else {
    console.log("Successfully initialized Db")
  }
})

//TODO use morgan if not test

app.use(bodyParser.json())
app.use('/', routes)

app.listen(port, function () {
  console.log('Server listening at http://localhost:' + port)
})

// for use in testing
module.exports = app