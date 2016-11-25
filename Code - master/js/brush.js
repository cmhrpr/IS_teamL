function initBrush(tool) {

    var moving = false;
    var x;
    var y;
    var beid = 0; // brushElement ID
    var did; // dot ID
    var color;
    var size;
    var brushElements = {};
    var currentElement;
    var handle;

    $("#canvas").unbind();

    switch (tool) {
        case "brush":
            console.log("tool - "+ tool);
            handle = $( "#custom-handle" );
            $( "#slider" ).slider({
                value: '20',
                create: function() {
                    handle.text( $( this ).slider( "value" ) );
                },
                slide: function( event, ui ) {
                    handle.text( ui.value );
                }
            });
            $('#custom-handle').html(20);
            break

        case "pencil":
            console.log("tool - "+ tool);
            handle = $( "#custom-handle" );
            $( "#slider" ).slider({
                value: '5',
                create: function() {
                    handle.text( $( this ).slider( "value" ) );
                },
                slide: function( event, ui ) {
                    handle.text( ui.value );
                }
            });
            $('#custom-handle').html(5);
            break;

        case "spray":
            console.log("tool - "+ tool);
            handle = $( "#custom-handle" );
            $( "#slider" ).slider({
                value: '100',
                create: function() {
                    handle.text( $( this ).slider( "value" ) );
                },
                slide: function( event, ui ) {
                    handle.text( ui.value );
                }
            });
            $('#custom-handle').html(100);
            break;
        default:
            console.log("???");

    }

    $("#canvas")
        .mousemove(function() {
            if (moving) {

                x = event.clientX / $("#canvas").width() * 100 - 22;     // Get the horizontal coordinate
                y = event.clientY / $("#canvas").height() * 100 - 10;     // Get the vertical coordinate
                did++;


                color = $('.jscolor').val();
                size = $('#custom-handle').html();
                currentElement[did] = {"x": x, "y":y, "bgcolor":color, "size":size};

                $("#canvas").append("<div class='circle beid"+beid+"' style='position: absolute; top: "+(y)+"%; left: "+(x)+"%; background-color:"+color+"; border-radius: 50px; width: "+size+"px; height: "+size+"px'></div>");
            }
        })
        .mousedown(function() {
            moving = true;
            beid++;
            did = 0;
            currentElement = {};
            $("#canvas").css("cursor","default");
        })
        .mouseup(function() {
            moving = false;
            brushElements[beid] = currentElement;
            console.log(brushElements);
            // SOCKET EMIT HERE
        });
}


