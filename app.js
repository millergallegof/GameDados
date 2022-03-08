/* import of required packages */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const conexionDB = require("./config/bd")
const methodOverride = require('method-override')
const bodyParser = require('body-parser');

/* system routing variables */
const indexRouter = require('./routes/index');

/* Use of express */
const app = express();

/* system templates */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/* mongodb connection to a specific database */
conexionDB();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* use of body-parser to bring elements from the formulary */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'));

/* system routes */
app.use('/', indexRouter);
app.use('/game', require('./routes/game'));
app.use('/startGame', require('./routes/startGame'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/* module export */
module.exports = app;
