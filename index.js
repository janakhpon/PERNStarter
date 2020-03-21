//assign modules
const express = require('express')
const bodyParser = require('body-parser')

//assign route
const task = require('./routes/api');
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();


app.prepare().then(() => {
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(bodyParser.json());
    server.use('/api/task', task);
    server.get('*', (req, res) => {
        return handle(req, res)
    });

    let port = process.env.PORT || 3000;
    server.listen(port, function () {
        console.log(`App running on http://localhost:${port}/\nAPI running on http://localhost:${port}/api/task`)
    });
});

