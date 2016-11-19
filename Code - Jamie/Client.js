tool_enum = {
    SELECTOR: 1,
    DRAWTOOL: 2
}

var currently_selected_tool;

function init() {
    click_selector_tool();
}

function click_selector_tool() {
    document.getElementById("selector_icon_div").style.backgroundColor = "lightblue";
    document.getElementById("selector_text_div").style.backgroundColor = "lightblue";
    if (currently_selected_tool == tool_enum.DRAWTOOL) {
        document.getElementById("drawtool_icon_div").style.backgroundColor = "white";
        document.getElementById("drawtool_text_div").style.backgroundColor = "white";
    }
    currently_selected_tool = tool_enum.SELECTOR
}

function click_draw_tool() {
    document.getElementById("drawtool_icon_div").style.backgroundColor = "lightblue";
    document.getElementById("drawtool_text_div").style.backgroundColor = "lightblue";
    if (currently_selected_tool == tool_enum.SELECTOR) {
        document.getElementById("selector_icon_div").style.backgroundColor = "white";
        document.getElementById("selector_text_div").style.backgroundColor = "white";
    }
    currently_selected_tool = tool_enum.DRAWTOOL
}



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
        $("#shape_owner").text("user" + owners[_obj.attr("id")])

    }

    // removes stroke from selected object, sets selected to null
    function deselect() {
      $("#shape_owner").text("none")

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
        $('<div id="' + tId + '"  class="draggable editable">' + text + '</div>').appendTo('#canvas_area');

        $("#" + tId)
            .draggable()
            .click(function() {
                // sets text element as selected and makes editable

                select($(this));
                if ($(this).is('.ui-draggable-dragging')) {
                    return;
                }
                $(this).draggable("option", "disabled", true);
                //$(this).attr('contenteditable', 'true');
            })

        .blur(function() {
            // stops text from being editable while blurred
            $(this).draggable('option', 'disabled', false);
            //$(this).attr('contenteditable', 'false');
        });

        return $("#" + tId);

    }

    function createText(msg) {
        console.log("creating this text");
        console.log(msg);
        $('<div id="' + msg.id + '"  class="draggable">' + msg.element + '</div>').appendTo('#canvas_area');

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
                //$(this).attr('contenteditable', 'false');
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
            //  $(this).attr('contenteditable', 'true');
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

        $('<img id="' + msg.id + '"  class="draggable" src="' + msg.element + '">').appendTo('#canvas_area');

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

    var owners = {};
    // create an element
    function createElement(msg) {
        console.log("creating shape " + msg.id)
        var e = $(msg.element);
        e.attr('id', msg.id);

        owners[msg.id] = msg.owner;

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
            select(e);
        });
        $("#canvas_area").append(e);
    }

    function createExistingElement(msg) {
        console.log("creating shape " + msg['id'])
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
            select(e);
        });

        $("#canvas_area").append(e);
    }

    function dragElement(msg) {
        console.log('well this is a drag')
        console.log(msg);
        console.log($("#" + msg.id))
        $("#" + msg.id).css({
            left: msg.left,
            top: msg.top
        });
        console.log($("#" + msg.id))

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
        $("#user_table").append("<tr id='user" + userId + "'><td><center><img src='" + icon + "' width=50 height=50 /></center></td><td>guest" + userId + "</td></tr>")


    }

    function addChat(msg) {
        $("#chat_pane_content_box").append("<tr id='chat_user" + msg.userId + "'><td><center></td><td>guest" + msg.userId + ": " + msg.chat + "</td></tr>")


    }

    function removeUser(userId) {
        $("#user" + userId).remove()
    }



    function transformElement(msg) {
        $("#" + msg.id)
            .css("transform", msg.transform);
    }

    function fillElement(msg) {
        $("#" + msg.id)
            .css("fill", msg.fill);
    }

    var userId = '';

    socket.on('user_id', function(msg) {
        userId = msg;
        $("#titleBar").append("<b>User " + userId + "</b>")
    });

    socket.on('create', function(msg) {
        createElement(msg);
    });

    socket.on('user_joined', function(msg) {
        console.log('user ' + msg.userId + ' joined the server')

        addUser(msg.userId)
    })

    socket.on('chat_message', function(msg) {
        addChat(msg);
    })


    socket.on('existing_users', function(msg) {
        console.log('existing users: ')
        console.log(msg.users)

        for (var i = 0; i < msg.users.length; i++) {
            addUser(msg.users[i]);
        }

        //addUser(msg.userId)
    })

    socket.on('existing_shapes', function(msg) {
        console.log('existing shapes: ')
        console.log(Object.keys(msg.shapes).length)
        console.log(msg.shapes)

        for (var i = 0; i < Object.keys(msg.shapes).length; i++) {
            var thisEl = Object.keys(msg.shapes)[i]
            console.log('creating shape ' + i)
            owners[thisEl] = msg.shapes[thisEl].owner
            console.log(msg.shapes[thisEl])
            if (msg.shapes[thisEl].type == 'shape') {
                createExistingElement(msg.shapes[thisEl]);
            } else if (msg.shapes[thisEl].type == 'text') {
                createText(msg.shapes[thisEl]);

            } else if (msg.shapes[thisEl].type == 'text') {
                createImage(msg.shapes[thisEl]);

            }

            if (msg.shapes[thisEl].drag != '' && msg.shapes[thisEl].drag != undefined) {
              console.log("DRAG EQUALS")
              console.log(msg.shapes[thisEl].drag)
                dragElement(msg.shapes[thisEl].drag)
            }

            if (msg.shapes[thisEl].fill != '' && msg.shapes[thisEl].fill != undefined) {
              console.log("FILL EQUALS")
              console.log(msg.shapes[thisEl].fill)
                fillElement(msg.shapes[thisEl].fill)
            }

            if (msg.shapes[thisEl].transform != '' && msg.shapes[thisEl].transform != undefined) {
              console.log("TRANSFORM EQUALS")
              console.log(msg.shapes[thisEl].transform)
              transformElement(msg.shapes[thisEl].transform)
            }

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
        console.log("AM I STOPPED")
        console.log(msg);
        dragElement(msg);
    });

    /* On drag-move event */
    socket.on('drag-move', function(msg) {
        console.log("AM I MOVED")
        console.log(msg);
        dragElement(msg);
    });

    /* On transform event */
    socket.on('transform', function(msg) {
      console.log('transforming')

        console.log(msg);
        transformElement(msg);
    });

    /* On transform event */
    socket.on('fill', function(msg) {
        console.log(msg);
        fillElement(msg);
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
                if (!typing)
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
            socket.emit('create', {owner: userId, element: $(this).html()});
        });


    $("#newText").click(function() {

        socket.emit('create_text', $("#textValue").val());

    });

    $("#fillButton").click(function() {
      var fillValue = $("#fillValue").val();
      console.log("filling");
      console.log(selected);

      if (selected != null) {
        socket.emit('fill', {
            id: selected.attr('id'),
            fill: fillValue,
        });
      }
    });


    $("#scaleButton").click(function() {
      var scaleVal = $("#scaleValue").val();
      console.log("scaling");
      console.log(selected);

      if (selected != null) {
        socket.emit('transform', {
            id: selected.attr('id'),
            transform: "scale(" + scaleVal + ")",
        });
      }
    });


    $("#chat_submit").click(function() {

        socket.emit('chat_message', {
            chat: $("#chat_textbox").val(),
            userId: userId
        });

    });

    $("#newImg").click(function() {

        socket.emit('create_image', $("#imgUrl").val());

    });



});
