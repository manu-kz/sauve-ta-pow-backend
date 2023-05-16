require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('./models/connection');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var itinerariesRouter = require('./routes/itineraries');
var articlesRouter = require('./routes/articles');


var app = express();

const cors = require('cors');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
<<<<<<< HEAD
app.use('/hikes', hikesRouter);
=======
app.use('/hikes', itinerariesRouter);
>>>>>>> 9cb674b6dc8e67e571fc0d2d5262c45fa3abf8b8
app.use('/articles', articlesRouter);

module.exports = app;
