const express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  seed = require('./seed'),
  m = require("./modulesRegister");

m.register("user", './modules/user/module');
m.register("auth", './modules/auth/module');

var publicDir = __dirname + '/../dist';
var app = express();

mongoose.connect('mongodb://root:123@ds056698.mongolab.com:56698/icb', function(err) {
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

app.use(express.static(publicDir));
app.all('/views/*', function(req, res) {
  res.status(404);
  res.send("Not Found");
});

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(m.auth.middlewares.autoRenewToken);

app.use('/api/auth', m.auth.routes);
app.use('/api/user', m.user.routes);

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