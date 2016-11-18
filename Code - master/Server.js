var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var elementsFile = require('./Elements.js');

var WhiteBoardDocument = require('./Document.js').WhiteBoardDocument;

/* This is how we get the class definitions for the WhiteBoard shapes from Element.js */
var WhiteBoardObject = elementsFile.WhiteBoardObject;
var WhiteBoardShape = elementsFile.WhiteBoardShape;
var WhiteBoardPosition = elementsFile.WhiteBoardPosition;
var WhiteBoardSquare = elementsFile.WhiteBoardSquare;
var WhiteBoardRectangle = elementsFile.WhiteBoardRectangle;
var WhiteBoardText = elementsFile.WhiteBoardText;

var documents = {};

/* Send the Client.js file to the client */
app.get('/Client.js', function(req, res) {
    res.sendFile('client.js', {
        root: __dirname
    });
});

/* Send the shared-shapes.html file to the client */
app.get('/', function(req, res) {
    res.sendFile('shared-shapes.html', {
        root: __dirname
    });
});

/* Figure out if the user if joining an existing whiteboard */
app.get('/document/:docId', function(req, res) {
    // first we need to see if this document exists
    var documentId = req.params.docId;
        console.log("a user is trying to connect to document with id " + documentId);

        if (documentId in documents) {
          // this document already exists
          console.log("A user has joined document " + documentId);
        } else {
          // we need to create a new document
          console.log("Creating new document " + documentId);

          var newDoc = new WhiteBoardDocument(documentId);
          documents[documentId] = newDoc;
          console.log(documents);
        }
        //res.send("you are trying to connect to document with ID " + );
        res.sendFile('shared-shapes.html', {
            root: __dirname
        });



});

/* Initial client ID */
var id = 0;

/* When a new client connects */
io.on('connection', function(socket) {
    socket.on('create', function(msg) {
        console.log('create: ' + msg + "; assigning id m-" + id);
        io.emit('create', {
            id: "m-" + id++,
            element: msg
        });
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

http.listen(3000, function() {
    console.log('Listening on *:3000');
});
