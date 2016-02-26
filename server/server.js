require('app-module-path').addPath(__dirname);

const express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  appPath = require('app-module-path'),
  logger = require('morgan'),
  timeout = require('connect-timeout');

const authModule = require("auth/module");
const churchModule = require("church/module");
const eventModule = require("event/module");
const informativeModule = require("informative/module");
const userModule = require("user/module");

const publicDir = __dirname + "/../dist";
const seed = require('./seed');

//mongodb://root:123@ds056698.mongolab.com:56698/icb
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/icb', function(err) {
  if (err)
    throw err;
  seed();
});

const app = express();

app.use(timeout('5s'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(authModule.middlewares.autoRenewToken);
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Expose-Headers', 'X-Token');
  next();
});

//Views
app.use(express.static(publicDir));
app.all('/views/*', function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use('/api/auth', authModule.routes);
app.use('/api/church', churchModule.routes);
app.use('/api/event', eventModule.routes);
app.use('/api/informative', informativeModule.routes);
app.use('/api/user', userModule.routes);

app.use('/api', function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.get("*", function(req, res) {
  res.sendFile('index.html', {
    root: publicDir
  });
});

// catch 404 and forward to error handleconst auth = require('config').auth;
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.error(err);
    console.error(err.stack);

    if (typeof err == 'string') {
      err = {
        message: err
      };
    }

    res.status(err.status || 500);
    res.send({
      message: err.message,
      status: err.status || 500,
      stack: err.stack
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

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Running on port ' + port);
});