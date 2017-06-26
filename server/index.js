//Main stating point of the Application
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const http = require('http');
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

//Setup MongoDB
mongoose.connect('mongodb://localhost:auth/auth');
//Creating app setUp
const app = express();
app.use(bodyParser.json({ type : "*/*"}));
app.use(morgan('combined'));
app.use(cors());
router(app);


//WebServer setUp

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server Listening at ..', port);
