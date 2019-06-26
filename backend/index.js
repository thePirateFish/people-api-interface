const app = require('./server')

// check PORT environment variable, otherwise 3000
const port = process.env.PORT || 3000

if (process.env.NODE_ENV != 'test') {
  app.listen(port, function () {
    console.log('Server listening at http://localhost:' + port)
  })
}