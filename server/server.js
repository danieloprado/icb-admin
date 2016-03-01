require('app-module-path').addPath(__dirname);

const express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  appPath = require('app-module-path'),
  logger = require('morgan'),
  timeout = require('connect-timeout');

const adminRoutes = require('admin/routes');
const publicDir = __dirname + "/../dist";

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/icb', function(err) {
  if (err) throw err;
});

const app = express();

app.use(timeout('5s'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Expose-Headers', 'X-Token');
  next();
});


app.use('/api/admin/', adminRoutes);

app.use('/api', function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//Views
app.use(express.static(publicDir));
app.all('/views/*', function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.get("*", function(req, res) {
  res.sendFile('index.html', {
    root: publicDir
  });
});

// error handlers
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

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

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Running on port ' + port);
});