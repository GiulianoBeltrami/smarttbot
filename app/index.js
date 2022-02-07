const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api",routes);

if (require.main === module) {
    app.listen(port)
    console.log('API funcionando!')
}

module.exports = app;