$(function() {
    var socket = io();

    socket.on('create', function(msg) {
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
        });

        $("#board").append(e);
    });


    /* Event listeners */

    /* On drag-stop event */
    socket.on('drag-stop', function(msg) {
        $("#" + msg.id).css({
            left: msg.left,
            top: msg.top
        });
    });

    /* On drag-move event */
    socket.on('drag-move', function(msg) {
        $("#" + msg.id).css({
            left: msg.left,
            top: msg.top
        });
    });

    /* On transform event */
    socket.on('transform', function(msg) {
        $("#" + msg.id)
            .css("transform", msg.transform)
            .css("fill", msg.fill);
    });

    /* Wrap all svg children of templates element in a span element */
    $("#templates").children("svg").wrap("<span>");

    /* Add a click event to each child of templates */
    $("#templates")
        .children()
        .click(function() {
            socket.emit('create', $(this).html());
        });
});
