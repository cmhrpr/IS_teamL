var express = require('express'), 
    app = express(),
    http = require('http')
     ;

var server = http.createServer(app);
var io = require('socket.io')(server);
server.listen(8080);
app.use(express.static(__dirname + '/public'));
console.log("Server running on 127.0.0.1:8080");

var line_history = [];
var count = 0;

// event-handler for new incoming connections
io.on('connection', function (socket) {
	
	count++;

   // first send the history to the new client
   for (var i in line_history) {
      socket.emit('draw_line', { line: line_history[i] } );
   }
   
   // report the number of users has increased
   socket.emit('message',{
	   count: count
   });
   // add handler for message type "draw_line".
   socket.on('draw_line', function (data) {
      // add received line to history 
      line_history.push(data.line);
      // send line to all clients
      io.emit('draw_line', { line: data.line });
   });
   
   socket.on('clear', function() {
        line_history = [];
       io.emit('clear');
    });
	
	socket.on('disconnect', function(){
		count--;
    });
	
   
   
});