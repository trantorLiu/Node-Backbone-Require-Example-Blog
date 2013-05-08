var async  = require('async'),
    fs        = require('fs'),
    requirejs = require('requirejs'),
    jsConfig, cssConfig, filePaths, actionsLeft, assetBuilder;

actionsLeft = 2;

jsConfig = {
    baseUrl: __dirname + '/../public/javascripts'
    , name: 'main'
    , out: __dirname + '/../public/built/main-built.js'
    , mainConfigFile: __dirname + '/../public/javascripts/main.js'
    , logLevel: 1
};

// cssConfig a la RequireJS optimizer
cssConfig = {
  baseUrl: __dirname + '/../public/stylesheets'
  , cssIn: __dirname + '/../public/stylesheets/main.css'
  , out: __dirname + '/../public/built/main-built.css'
    , logLevel: 1
    // , optimizeCss: 'standard'
};

assetBuilder = function(callback) {
  requirejs.optimize(jsConfig, function (buildResponse) {
    if (!--actionsLeft) {
      callback();
    }
  });
  requirejs.optimize(cssConfig, function (buildResponse) {
    if (!--actionsLeft) {
      callback();
    }
  });
};

module.exports = assetBuilder;
