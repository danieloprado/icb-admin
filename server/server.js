var express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

var seed = require('./seed'),
  userModule = require('./modules/user/module'),
  authModule = require('./modules/auth/module');

var publicDir = __dirname + '/../dist';

var app = express();

mongoose.connect('mongodb://root:123@ds056698.mongolab.com:56698/icb', function(err) {
  if (err) {
    throw err;
  }

  seed();
});

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
};

app.use(allowCrossDomain);
app.use(express.static(publicDir));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(authModule.middlewares.autoRenewToken);

app.use('/api/auth', authModule.routes);
app.use('/api/user', userModule.routes);

app.all('/views/*', function(req, res) {
  res.status(404);
  res.send("Not Found");
});

app.all("/*", function(req, res) {
  res.sendFile('index.html', {
    root: publicDir
  });
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