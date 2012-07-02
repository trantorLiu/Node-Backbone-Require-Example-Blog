/**
 * Module dependencies.
 */

var express = require('express')
	, mongoose = require('mongoose')
	, http = require('http')
	, config = require('./config');

var app = express();

mongoose.connect('mongodb://localhost/' + config.DB_NAME);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// config routers
['post'].forEach(function (route) {
	require('./routes/' + route)(app);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
