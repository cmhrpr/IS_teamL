var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var elementsFile = require('./Elements.js');

/* We need our WhiteBoardDocument class from Document.js */
var WhiteBoardDocument = require('./Document.js').WhiteBoardDocument;

/* This is how we get the class definitions for the WhiteBoard shapes from Element.js */
var WhiteBoardObject = elementsFile.WhiteBoardObject;
var WhiteBoardShape = elementsFile.WhiteBoardShape;
var WhiteBoardPosition = elementsFile.WhiteBoardPosition;
var WhiteBoardSquare = elementsFile.WhiteBoardSquare;
var WhiteBoardRectangle = elementsFile.WhiteBoardRectangle;
var WhiteBoardText = elementsFile.WhiteBoardText;

var documents = {};

app.use(express.static('public'))


/* Send the Client.js file to the client*/
app.get('/Client.js', function(req, res) {
    res.sendFile('Client.js', {
        root: __dirname
    });
});



/* Send the shared-shapes.html file to the client */
app.get('/', function(req, res) {
    res.sendFile('newLayout.html', {
        root: __dirname
    });
});


/* Figure out if the user if joining an existing whiteboard */
app.get('/:docId', function(req, res) {
    // first we need to see if this document exists
    var documentId = req.params.docId;
    if (documentId != "Client.js") {

        console.log("documents before: ");
        console.log(documents);


        //console.log(typeof(documentId));
        //console.log((documentId in Object.keys(documents)));
        if (documents.hasOwnProperty(documentId)) {
            // this document already exists
            console.log("A user has joined document " + documentId);
        } else {
            // we need to create a new document
            console.log("Creating new document " + documentId);

            var newDoc = new WhiteBoardDocument(documentId);
            documents[documentId] = newDoc;
        }



        console.log("documents after: ");
        console.log(documents);

    }


    //res.send("you are trying to connect to document with ID " + );
    res.sendFile('newLayout.html', {
        root: __dirname
    });

});

/* Initial client ID */
var id = 0;
var userId = 0;

var allClients = {}

var allShapes = {}
var allChats = []

var line_history = {};
var count = 0;

var doc = new WhiteBoardDocument(1);

/* When a new client connects */
io.on('connection', function(socket) {
  var roomId = 'main room'
  socket.join(roomId);


  // send existing users
  socket.emit('existing_users', {users: Object.keys(allClients)});
  socket.emit('existing_shapes', {shapes: doc.elements});
    count++;

    // first send the history to the new client
    for(i in line_history){

        var entry = {};
        var key = i;
        var value = line_history[i];
        entry[key] = value;
        //console.log(entry);
        socket.emit('draw_line', entry);

    }


    for (var i in allChats) {
      console.log(allChats[i]);
      socket.emit('chat_message', allChats[i]);
    }

    socket.on('chat_message', function(msg) {
        console.log(msg);
        var fullMSG = "User " +clientId + ": " +msg;
        allChats.push(fullMSG);
        console.log(allChats);
        io.emit('chat_message', fullMSG);
    });

    // report the number of users has increased
    socket.emit('message', {
        count: count
    });
    // add handler for message type "draw_line".
    // socket.on('draw_line', function(data) {
    //     // add received line to history
    //     line_history.push(data.line);
    //     // send line to all clients
    //     io.emit('draw_line', {
    //         line: data.line
    //     });
    // });


    socket.on('newstroke', function(data) {
        console.log("Received a new stroke!");
        var key = data["strokeID"];
        var value = data["data"]
        var entry = {};
        entry[key] = value;

        line_history[key] = value;
        console.log(entry);
        io.emit('draw_line', entry);
    });

    socket.on('clear', function() {
        line_history = {};
        io.emit('clear');
    });

    socket.on('remove_stroke', function(data) {
        console.log("Request to delete a stroke!");
        var key = data["strokeID"];
        delete line_history[key];
        io.emit('wipe_stroke', key);
    });



    // send existing users
    socket.emit('existing_users', {
        users: Object.keys(allClients)
    });
    socket.emit('existing_shapes', {
        shapes: allShapes
    });

    var clientId = userId++;

    // add user to the allclients list
    allClients[clientId] = socket;
    socket.emit('user_id', clientId)


    socket.on('create', function(msg) {
        console.log('create: ' + msg + "; assigning id m-" + id);
        doc.elements["m-" + id] = {
            id: "m-" + id,
            element: msg,
            drag: '',
            tranform: {id: "", tranform: "", fill: ""},
            type: 'shape'
        };
        io.emit('create', {
            id: "m-" + id++,
            element: msg
        });
    });

    console.log('UserID: ' + clientId + ' joined the server')

    // let everyone know a user joined

    io.emit('user_joined', {
        userId: clientId
    })


    // socket.on('create', function(msg) {
    //     console.log('create: ' + msg + "; assigning id m-" + id);
    //     doc.elements["m-" + id] = {
    //         id: "m-" + id,
    //         element: msg,
    //         drag: '',
    //         tranform: '',
    //         type: 'shape'
    //     };
    //     io.emit('create', {
    //         id: "m-" + id++,
    //         element: msg
    //     });
    // });
    socket.on('drag-move', function(msg) {
        console.log('drag-move: ' + msg.id + " to " + msg.top + " " + msg.left);
        console.log(msg);

        doc.elements[msg.id].drag = msg;

        console.log();
        socket.volatile.broadcast.emit('drag-move', msg);
    });


    socket.on('drag-stop', function(msg) {
        console.log('drag-stop: ' + msg.id + " to " + msg.top + " " + msg.left);
        socket.broadcast.emit('drag-stop', msg);
    });

    /* Relay transform message */
    socket.on('transform', function(msg) {
      console.log("begin transform")
      console.log("msg:")
      console.log(msg);
      console.log("element:")

      console.log(doc.elements[msg.id]['transform'])
        doc.elements[msg.id].transform.transform = msg.tranform;
        doc.elements[msg.id].transform.fill = msg.fill;



        io.emit('transform', msg);

    });

    /* Remove the element with with id msg['id'] */
    socket.on('remove', function(msg) {
      console.log('removing ' + msg['id']);
      delete doc.elements[msg['id']];
      socket.volatile.broadcast.emit('remove', msg);
    })


    var shapeKeys = Object.keys(doc.elements);

    for (var i = 0; i < shapeKeys.length; i++) {
        var index = shapeKeys[i];

        socket.emit('transform', {shapes: doc.elements[index].transform});

    }

    socket.on('disconnect', function() {
        console.log('Got disconnect!' + clientId);
        io.emit('user_left', {
            userId: clientId
        })
        delete allClients[clientId];
        count--;
    });
});

http.listen(3000, function() {
    console.log('Listening on *:3000');
});
