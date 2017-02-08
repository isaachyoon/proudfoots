// Initiate connection to DB
var mongoose = require('mongoose');
//MONGODB CONNECTION
mongoose.connect('mongodb://localhost/billfetchertest');

var http = require('http');
var app = require('./server-config.js');


//HTTP SERVER CONNECTION
var server = http.createServer(app);
var port = process.env.PORT || 8080;


server.listen(port, function() {
  console.log('Server now listening on port ' + port);
});

//app.listen(port);

//console.log('Server now listening on port ' + port);