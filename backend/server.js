const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const path = require('path');
const port = 3000;

const app = express();

app.use(bodyParser.json());
app.use('/', routes);

app.listen(port, function () {
	console.log("Server listening at http://localhost:" + port);
});