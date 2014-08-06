
/*
 * GET home page.
 */

var routing = require('../routing/main.json');

exports.index = function(req, res){
  res.render('index', { title: 'Coding Dojo - Chrome Dev Tools'});
};

exports.forcedLayout = function(req, res) {
    res.render('forcedLayout', { title: 'Forced layout'});
};

