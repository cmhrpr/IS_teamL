(function() {
  var io;
  var connect = require('connect');
  var serveStatic = require('serve-static');
  var app = connect();
  app.use(serveStatic(__dirname));
  app.listen(8080);
  io = require('socket.io').listen(4000);
  io.sockets.on('connection', function(socket) {
    socket.on('drawClick', function(data) {
      socket.broadcast.emit('draw', {
        x: data.x,
        y: data.y,
        type: data.type
      });
    });
  });
}).call(this);
