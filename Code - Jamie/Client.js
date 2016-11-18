$(function() {
    var socket = io();



    var elements = {};
    var shift = 0;
    var typing = 0;

    function remove(_obj) {
        console.log("Beginning remove");
        // get the ID of the object
        var objId = _obj.attr("id");

        // send removal of this object to the server
        socket.emit('remove', {
            id: objId
        });

        // remove the object itself
        removeObject(_obj);
    }

    //
    function removeObject(_obj) {
        _obj.remove();
    }

    // sets the inputted object as the selected and gives it a border
    function select(_obj) {
        console.log("Beginning select");

        // we need to deselect the object
        if (selected != null) {
            deselect();
        }

        selected = _obj;

        // attach css
        selected.children().attr("stroke", "yellow");
        selected.children().attr("stroke-width", "5");


    }

    // removes stroke from selected object, sets selected to null
    function deselect() {
        console.log("Beginning deselect");
        // remove border or something?
        if (selected != null) {
            // remove CSS
            selected.children().removeAttr("stroke");
            selected.children().removeAttr("stroke-width")
        }

        selected = null;
    }



    function createNewText(tId, text) {
      $( '<div id="'+ tId +'"  class="draggable editable">' + text +'</div>' ).appendTo( '#canvas_area' );

      $("#" + tId)
          .draggable()
          .click(function() {
            // sets text element as selected and makes editable

              select($(this));
              if ($(this).is('.ui-draggable-dragging')) {
                  return;
              }
              $(this).draggable("option", "disabled", true);
              $(this).attr('contenteditable', 'true');
          })

      .blur(function() {
        // stops text from being editable while blurred
          $(this).draggable('option', 'disabled', false);
          $(this).attr('contenteditable', 'false');
      });

      return $("#" + tId);

    }

    function createText(msg) {

      $( '<div id="'+ msg.id +'"  class="draggable">' + msg.element +'</div>' ).appendTo( '#canvas_area' );

      /* when we start dragging an element */
      $("#" + msg.id).draggable({
          /* emit a drag-move through Socket when dragging */
          drag: function(event, ui) {
              socket.emit('drag-move', {
                  id: event.target.id,
                  left: ui.position.left,
                  top: ui.position.top
              });

              $(this).draggable('option', 'disabled', false);
              $(this).attr('contenteditable', 'false');
          },
          /* emit a drag-stop through Socket when stopped dragging */
          stop: function(event, ui) {
              socket.emit('drag-stop', {
                  id: event.target.id,
                  left: ui.position.left,
                  top: ui.position.top
              });
          }
      });


      $("#" + msg.id).click(function() {
          socket.emit('transform', {
              id: this.id,
              transform: $("input[name=transform]:checked").val(),
              fill: $("input[name=fill]:checked").val()
          });

          select($("#" + msg.id));
          if ($(this).is('.ui-draggable-dragging')) {
              return;
          }
          $(this).draggable("option", "disabled", true);
          $(this).attr('contenteditable', 'true');
      });

    /*  $("#" + msg.id)
          .draggable()
          .click(function() {
            // sets text element as selected and makes editable

              select($(this));
              if ($(this).is('.ui-draggable-dragging')) {
                  return;
              }
              $(this).draggable("option", "disabled", true);
              $(this).attr('contenteditable', 'true');
          })

      .blur(function() {
        // stops text from being editable while blurred
          $(this).draggable('option', 'disabled', false);
          $(this).attr('contenteditable', 'false');
      });*/

    }


    function createImage(msg) {

      $( '<img id="'+ msg.id +'"  class="draggable" src="' + msg.element +'">' ).appendTo( '#canvas_area' );

      /* when we start dragging an element */
      $("#" + msg.id).draggable({
          /* emit a drag-move through Socket when dragging */
          drag: function(event, ui) {
              socket.emit('drag-move', {
                  id: event.target.id,
                  left: ui.position.left,
                  top: ui.position.top
              });

              $(this).draggable('option', 'disabled', false);
              $(this).attr('contenteditable', 'false');
          },
          /* emit a drag-stop through Socket when stopped dragging */
          stop: function(event, ui) {
              socket.emit('drag-stop', {
                  id: event.target.id,
                  left: ui.position.left,
                  top: ui.position.top
              });
          }
      });


      $("#" + msg.id).click(function() {
          socket.emit('transform', {
              id: this.id,
              transform: $("input[name=transform]:checked").val(),
              fill: $("input[name=fill]:checked").val()
          });

          select($("#" + msg.id));
          if ($(this).is('.ui-draggable-dragging')) {
              return;
          }
          $(this).draggable("option", "disabled", true);
          $(this).attr('contenteditable', 'true');
      });

    /*  $("#" + msg.id)
          .draggable()
          .click(function() {
            // sets text element as selected and makes editable

              select($(this));
              if ($(this).is('.ui-draggable-dragging')) {
                  return;
              }
              $(this).draggable("option", "disabled", true);
              $(this).attr('contenteditable', 'true');
          })

      .blur(function() {
        // stops text from being editable while blurred
          $(this).draggable('option', 'disabled', false);
          $(this).attr('contenteditable', 'false');
      });*/

    }
    // create an element
    function createElement(msg) {
      console.log("creating shape " + msg.id )
        var e = $(msg.element);
        e.attr('id', msg.id);

        /* when we start dragging an element */
        e.draggable({
            /* emit a drag-move through Socket when dragging */
            drag: function(event, ui) {
                socket.emit('drag-move', {
                    id: event.target.id,
                    left: ui.position.left,
                    top: ui.position.top
                });
            },
            /* emit a drag-stop through Socket when stopped dragging */
            stop: function(event, ui) {
                socket.emit('drag-stop', {
                    id: event.target.id,
                    left: ui.position.left,
                    top: ui.position.top
                });
            }
        });


        e.click(function() {
            socket.emit('transform', {
                id: this.id,
                transform: $("input[name=transform]:checked").val(),
                fill: $("input[name=fill]:checked").val()
            });

            select(e);
        });
        $("#canvas_area").append(e);
    }

    function createExistingElement(msg) {
      console.log("creating shape " + msg['id'] )
        var e = $(msg['element']);
        e.attr('id', msg['id']);

        /* when we start dragging an element */
        e.draggable({
            /* emit a drag-move through Socket when dragging */
            drag: function(event, ui) {
                socket.emit('drag-move', {
                    id: event.target.id,
                    left: ui.position.left,
                    top: ui.position.top
                });
            },
            /* emit a drag-stop through Socket when stopped dragging */
            stop: function(event, ui) {
                socket.emit('drag-stop', {
                    id: event.target.id,
                    left: ui.position.left,
                    top: ui.position.top
                });
            }
        });


        e.click(function() {
            socket.emit('transform', {
                id: this.id,
                transform: $("input[name=transform]:checked").val(),
                fill: $("input[name=fill]:checked").val()
            });

            select(e);
        });

        $("#canvas_area").append(e);
    }

    function dragElement(msg) {
        $("#" + msg.id).css({
            left: msg.left,
            top: msg.top
        });
    }


    function addUser(userId) {
      var icon = "UserIcons/Icon";

      if (userId % 4 == 0) {
        icon = icon + "4";
      } else if (userId % 3 == 0) {
        icon = icon + "3";
      } else if (userId % 2 == 0) {
        icon = icon + "2";
      } else {
        icon = icon + "1";
      }

      icon = icon + ".png";
      $("#user_table").append("<tr id='user" + userId + "'><td><center><img src='" + icon +"' width=50 height=50 /></center></td><td>guest"+ userId +"</td></tr>")


    }

    function removeUser(userId) {
      $("#user" + userId).remove()
    }



    function transformElement(msg) {
        $("#" + msg.id)
            .css("transform", msg.transform)
            .css("fill", msg.fill);
    }

    socket.on('create', function(msg) {
        createElement(msg);
    });

    socket.on('user_joined', function(msg) {
      console.log('user ' + msg.userId + ' joined the server')

       addUser(msg.userId)
    })


    socket.on('existing_users', function(msg) {
      console.log('existing users: ' )
      console.log(msg.users )

      for (var i = 0; i < msg.users.length; i++) {
        addUser(msg.users[i]);
      }

       //addUser(msg.userId)
    })

    socket.on('existing_shapes', function(msg) {
      console.log('existing shapes: ' )
      console.log(Object.keys(msg.shapes).length)
      console.log(msg.shapes )

      for (var i = 0; i < Object.keys(msg.shapes).length; i++) {
        var thisEl = Object.keys(msg.shapes)[i]
        console.log('creating shape ' + i )

        console.log(msg.shapes[thisEl])
        createExistingElement(msg.shapes[thisEl]);

      }

       //addUser(msg.userId)
    })
    socket.on('user_left', function(msg) {
      console.log('user ' + msg.userId + ' left the server')

       removeUser(msg.userId)
    })

    socket.on('create_text', function(msg) {
      console.log("Creating text!");
        createText(msg);
    });

    socket.on('create_image', function(msg) {
      console.log("Creating text!");
        createImage(msg);
    });


    /* Event listeners */

    /* On drag-stop event */
    socket.on('drag-stop', function(msg) {
        dragElement(msg);
    });

    /* On drag-move event */
    socket.on('drag-move', function(msg) {
        dragElement(msg);
    });

    /* On transform event */
    socket.on('transform', function(msg) {
        transformElement(msg);
    });

    socket.on('remove', function(oId) {
        console.log(oId['id']);
        var objectId = "#" + oId['id'];
        removeObject($(objectId));
    })

    var selected = null;




    /* We need to listen for keys */
    $(document).keydown(function(e) {
        // ESCAPE key pressed

        // removed if pressed x
        if (e.keyCode == 88) {
            if (selected != null) {
                console.log("deleting");
                if(!typing)
                  remove(selected);
            } else {
                console.log("nothing selected to delete");

            }
        }

        // deselect if pressed escape
        if (e.keyCode == 27) {
            deselect();
        }

        if (e.keyCode == 22) {
            shift = 1;
            console.log("shift down");
        }
    })

    /* We need to listen for keys */
    $(document).keyup(function(e) {
        // ESCAPE key pressed


        if (e.keyCode == 22) {
            shift = 0;
            console.log("shift up");

        }
    })

    /* Wrap all svg children of templates element in a span element */
    $("#templates").children("svg").wrap("<span>");

    /* Add a click event to each child of templates */
    $("#templates")
        .children()
        .children()
	.children()
	.children()
        .click(function() {
            socket.emit('create', $(this).html());
        });


        $("#newText").click(function() {

          socket.emit('create_text', $("#textValue").val());

        });

        $("#newImg").click(function() {

          socket.emit('create_image', $("#imgUrl").val());

        });



});
