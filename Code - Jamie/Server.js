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




/* Send the Client.js file to the client*/
app.get('/script.js', function(req, res) {
    res.sendFile('script.js', {
        root: __dirname
    });
});


/* Send the Client.js file to the client*/
app.get('/style.css', function(req, res) {
    res.sendFile('style.css', {
        root: __dirname
    });
});

app.get('/Images/Cursor.bmp', function(req, res) {
    res.sendFile('Images/Cursor.bmp', {
        root: __dirname
    });
  });

  app.get('/UserIcons/Icon1.bmp', function(req, res) {
      res.sendFile('/UserIcons/Icon1.bmp', {
          root: __dirname
      });
    });

    app.get('/UserIcons/Icon3.bmp', function(req, res) {
        res.sendFile('/UserIcons/Icon1.bmp', {
            root: __dirname
        });
      });
      app.get('/UserIcons/Icon3.bmp', function(req, res) {
          res.sendFile('/UserIcons/Icon1.bmp', {
              root: __dirname
          });
        });

        app.get('/UserIcons/Icon4.bmp', function(req, res) {
            res.sendFile('/UserIcons/Icon1.bmp', {
                root: __dirname
            });
          });


  app.get('/Images/DrawTool.bmp', function(req, res) {
      res.sendFile('/Images/DrawTool.bmp', {
          root: __dirname
      });
    });


/* Send the shared-shapes.html file to the client */
app.get('/', function(req, res) {
    res.sendFile('shared-shapes.html', {
        root: __dirname
    });
});

users = []

/* Figure out if the user if joining an existing whiteboard */
app.get('/document/:docId', function(req, res) {
    // first we need to see if this document exists
    var documentId = req.params.docId;
    if (documentId != "client.js") {

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
    res.sendFile('shared-shapes.html', {
        root: __dirname
    });

});

/* Initial client ID */
var id = 0;
var userId = 0;

var allClients = {}

var allShapes = {}

var doc = new WhiteBoardDocument(1);


/* When a new client connects */
io.on('connection', function(socket) {
  var roomId = 'main room'
  socket.join(roomId);


  // send existing users
  socket.emit('existing_users', {users: Object.keys(allClients)});
  socket.emit('existing_shapes', {shapes: doc.elements});



    var clientId = userId++;

    // add user to the allclients list
    allClients[clientId] = socket;

    socket.on('create', function(msg) {
        console.log('create: ' + msg + "; assigning id m-" + id);
        doc.elements["m-" + id] = {
            id: "m-" + id,
            element: msg,
            drag: '',
            tranform: '',
            type: 'shape'
        };
        io.emit('create', {
            id: "m-" + id++,
            element: msg
        });
    });
    console.log('UserID: ' + clientId + ' joined the server')

    // let everyone know a user joined

    io.emit('user_joined', {userId: clientId})


    socket.on('create_text', function(msg) {
      console.log('create_text: ' + msg + "; assigning id m-" + id);

      doc.elements["m-" + id] = {
          id: "m-" + id,
          element: msg,
          drag: '',
          tranform: '',
          type: 'text'
      };

      io.emit('create_text', {
          id: "m-" + id++,
          element: msg
      });
    });
    socket.on('create_image', function(msg) {
      console.log('create_image: ' + msg + "; assigning id m-" + id);
      doc.elements["m-" + id] = {
          id: "m-" + id,
          element: msg,
          drag: '',
          tranform: '',
          type: 'image'
      };
      io.emit('create_image', {
          id: "m-" + id++,
          element: msg
      });
    });
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
    socket.on('transform', function(msg) {
        console.log('transform: ' + msg);
        // update the elements

        io.emit('transform', msg);
    });
    socket.on('remove', function(oId) {
      console.log(doc.elements)

      console.log('removing ' + oId);
      console.log(oId);

      console.log(oId['id'].replace("m-", ""));
      delete doc.elements[oId['id'].replace("m-", "")];
      socket.volatile.broadcast.emit('remove', oId);
    })
    var shapeKeys = Object.keys(doc.elements);

    for (var i = 0; i < shapeKeys.length; i++) {
        var index = shapeKeys[i];
        socket.emit('drag-move', {shapes: doc.elements[index].drag});
        socket.emit('drag-stop', {shapes: doc.elements[index].drag});

    }
    socket.on('disconnect', function() {
      console.log('Got disconnect!' + clientId);
      io.emit('user_left', {userId:clientId})
      delete allClients[clientId];
    });
});

http.listen(3000, function() {
    console.log('Listening on *:3000');
});
