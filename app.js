var express = require('express');
var methodOverride = require('method-override');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var controller = require('./lib/setup-controller');
var model = require('./lib/setup-model');
var token_validation = require('./lib/validate-token');
var alter_req_body = require('./lib/alter-req-body');
var xhr_error_handler = require('./lib/xhr-error-handler');
const params = require('./parameters');

console.log("Welcome to Dogbiz BillBoard!");
console.log("You are running on %s mode!", process.env.NODE_ENV);

var app = express();
app.locals = params.app.locals;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// SOURCE: https://github.com/expressjs/method-override
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

app.use(express.static(path.join(__dirname, 'public')));

// load models
app.use(model);
// alter req body
app.use(alter_req_body);
// check logged in
app.use(token_validation);
// load controllers
controller(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// Error handler for XHR req
app.use(xhr_error_handler);

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
