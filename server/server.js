require('app-module-path').addPath(__dirname);

const express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  appPath = require('app-module-path'),
  logger = require('morgan'),
  timeout = require('connect-timeout');


const middlewares = require('middlewares');
const adminRoutes = require('admin/routes');
const appRoutes = require('app/routes');
const publicDir = __dirname + "/../dist";

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/icb', (err) => {
  if (err) throw err;
});

const app = express();

app.use(timeout('5s'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(middlewares.allowCors);
app.use(middlewares.bindUser);

app.use('/api/admin', adminRoutes);
app.use('/api/app', appRoutes);
app.use('/api', middlewares.notFound);

//Views
app.use(express.static(publicDir));
app.all('/views/*', middlewares.notFound);

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