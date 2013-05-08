var cluster = require('cluster'),
    config = require('./config'),
    numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    var i;
    // Fork workers.
    for (i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', function(worker, code, signal) {
        console.info('Workerer #' + worker.id, 'with pid', worker.process.pid, 'died');
    });

} else {

  /**
   * Module dependencies.
   */

  var express = require('express'),
      mongoose = require('mongoose'),
      http = require('http'),
      config = require('./config'),
      app = express(),
      server;

  if (config.DB_USER && config.DB_PASSWORD) {
    mongoose.createConnection('mongodb://' + config.DB_USER + ':' + config.DB_PASSWORD + '@localhost/' + config.DB_NAME);
  } else {
    mongoose.createConnection('mongodb://localhost/' + config.DB_NAME);
  }

  mongoose.connect('mongodb://localhost/' + config.DB_NAME);

  app.configure(function() {
    app.set('port', config.PORT || 3000);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
  });

  app.configure('development', function() {
    app.use(express.errorHandler());
  });

  // config routers
  ['post'].forEach(function (route) {
    require('./routes/' + route)(app);
  });

  server = app.listen(app.get('port'), function() {
    console.info("Worker #" + cluster.worker.id, "with pid", cluster.worker.process.pid, "listening on port", app.get('port'));
  });
}
