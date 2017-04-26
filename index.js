// file: index.js

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('You have connected.');
})

http.listen(3000, function(){
  console.log('listening on *:3000');
});

====================================================================
// file: index2.js

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/classSelector.html');
});

io.on('connection', function(socket){
  console.log('You have connected.');
})

http.listen(3000, function(){
  console.log('listening on *:3000');
});
