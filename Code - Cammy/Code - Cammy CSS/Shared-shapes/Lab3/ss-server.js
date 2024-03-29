var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/ss-client.js', function(req, res){
  res.sendFile('ss-client-solution.js', { root: __dirname });
});

app.get('/', function(req, res){
  res.sendFile('shared-shapes.html', { root: __dirname });
});

var id = 0;
io.on('connection', function(socket) {
  socket.on('create', function(msg) {
    console.log('create: ' + msg + "; assigning id m-" + id);
    io.emit('create', {id: "m-" + id++, element: msg});
  });
  socket.on('drag-move', function(msg) {
    console.log('drag-move: ' + msg.id + " to " + msg.top + " " + msg.left);
    socket.volatile.broadcast.emit('drag-move', msg);
  });
  socket.on('drag-stop', function(msg) {
    console.log('drag-stop: ' + msg.id + " to " + msg.top + " " + msg.left);
    socket.broadcast.emit('drag-stop', msg);
  });
  socket.on('transform', function(msg) {
    console.log('transform: ' + msg);
    io.emit('transform', msg);
  });
});

http.listen(3000, function(){
  console.log('Listening on *:3000');
});
