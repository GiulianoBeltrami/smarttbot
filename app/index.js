const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const db = require('./database/db');

db.sync()
    .then(() => {
        const app = express();
        const port = 3000;
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use("/api", routes);
        app.listen(port, () => {
            console.log('API is up on port ' + port);
            console.log(`Send requests to: localhost:${port}`);
        })

    })
    .catch((error) => {
        throw new Error(error);
    });