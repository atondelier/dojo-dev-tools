
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var app = express();
var _ = app.locals._ = require('lodash');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var routing = app.locals.routing = require('./routing/main.json');

_.each(routing, function(routeObject, routeName) {
    var action = routeObject.action;
    var actionSplit = action.split(':');
    var controllerName = actionSplit[0];
    var actionName = actionSplit[1];
    app[routeObject.method.toLowerCase() || 'use'](routeObject.path, require('./controllers/'+controllerName)[actionName]);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
