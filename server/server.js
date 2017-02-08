// Initiate connection to DB
var mongoose = require('mongoose');
//MONGODB CONNECTION
mongoose.connect('mongodb://localhost/billfetchertest');

var socketIo = require('socket.io');
var http = require('http');
var app = require('./server-config.js');

var io = socketIo(server);


//HTTP SERVER CONNECTION
var server = http.createServer(app);
var port = process.env.PORT || 8080;

io.on('connection', function(socket) {
  socket.on('message', function(body) {
    socket.broadcast.emit('message', {
      body: body
      user: socket.id.slice(8);
    })
  })
})

server.listen(port, function() {
  console.log('Server now listening on port ' + port);
});

//app.listen(port);

//console.log('Server now listening on port ' + port);