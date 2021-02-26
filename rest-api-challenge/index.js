require('dotenv').config();
require('./src/config/database');
const { HttpServer } = require('./http-server.js');
const router = require('./src/routes');
const port = process.argv.slice(2)[0];
const app = new HttpServer(router, port);


const server = app.listen();
app.setupSocketServer(server);

module.exports = { server, app };


