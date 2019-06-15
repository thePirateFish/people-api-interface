const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const { initDb } = require('./db')
const path = require('path')
const port = 3000

const app = express()
initDb(function (err) {
  if (err) {
    console.log("Error initializing Db")
  } else {
    console.log("Successfully initialized Db")
  }
})

app.use(bodyParser.json())
app.use('/', routes)

app.listen(port, function () {
  console.log('Server listening at http://localhost:' + port)
})
