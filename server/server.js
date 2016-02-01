require('app-module-path').addPath(__dirname);

const express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  appPath = require('app-module-path'),
  seed = require('./seed');


var authModule = require("modules/auth/module");
var userModule = require("modules/user/module");

var app = express();

//mongodb://root:123@ds056698.mongolab.com:56698/icb
mongoose.connect('mongodb://localhost', function(err) {
  if (err) {
    throw err;
  }

  seed();
});

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});

app.use(express.static(__dirname + "/../dist"));
app.all('/views/*', function(req, res) {
  res.status(404);
  res.send("Not Found");
});

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(authModule.middlewares.autoRenewToken);

app.use('/api/auth', authModule.routes);
app.use('/api/user', userModule.routes);

app.all("/*", function(req, res) {
  res.sendFile('index.html', {
    root: publicDir
  });
});

app.use(function(req, res, next) {
  res.status(404);
  res.send("Not Found");
});

app.use(function(err, req, res, next) {
  res.status(500);
  res.send({
    error: err
  });
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Running on port ' + port);
});