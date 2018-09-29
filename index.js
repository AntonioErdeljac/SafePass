const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const express = require('express');
const http = require('http');

const config = require('./config');
const routes = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(compression());
app.use(cookieParser());

app.use('/', routes());

http.createServer(app).listen(config.port);

console.log(`Listening on ${config.serverUrl}`);
