var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

var numTyping = 0;

io.on('connection', function(socket) {
    // emit message when user connects
    io.emit('user connected');

    // emit message when chat message receieved
    socket.on('chat message', function(msg) {
        io.emit('chat message', msg);
    });

    // emit message when user disconnects
    socket.on('disconnect', function() {
        io.emit('user disconnected')
    });

    // emit message when user is typing
    socket.on('typing', function(data) {
        console.log(data);
        if (data) {
            io.emit('typing', true)
            // increase typing user counter
            numTyping += 1;

            // log number of users typing to console
            console.log('user started typing.');
            console.log(numTyping + ' users typing');


        } else {
            numTyping += -1;

            // log that user has stopped typing
            console.log('user stopped typing.');
            console.log(numTyping + ' users typing');


            // if no users typing
            if (numTyping == 0) {
                // emit false typing message
                io.emit('typing', false)

            }



        }
    });

});

http.listen(3000, function() {
    console.log('listening on *:3000');
});
