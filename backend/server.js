const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;

const app = express();

app.listen(port, function () {
	console.log("Server listening at http://localhost:" + port);
});