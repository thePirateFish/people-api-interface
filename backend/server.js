const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const routes = require('./routes')
const { initDb } = require('./db')
const path = require('path')

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

module.exports = app