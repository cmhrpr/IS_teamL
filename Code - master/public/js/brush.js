function initBrush(tool) {

    var moving = false;
    var x;
    var y;
    var beid = 0; // brushElement ID
    var teid = 0; // textElement ID
    var did; // dot ID
    var color;
    var size;
	var textoutput;
    var textElements = {};
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
			
		case "texttool":
            console.log("tool - "+ tool);
            $( "#jstextbox" ).tooltip().mouseover();
            handle = $( "#custom-handle" );
            $( "#slider" ).slider({
                value: '70',
                create: function() {
                    handle.text( $( this ).slider( "value" ) );
                },
                slide: function( event, ui ) {
                    handle.text( ui.value );
                }
            });
            $('#custom-handle').html(70);
            break;
			
        default:
            console.log("???");

    }

    if (tool == "texttool") {

        $("#canvas").click(function () {

            moving = false;
            x = event.clientX / $("#canvas").width() * 100 - 22;     // Get the horizontal coordinate
            y = event.clientY / $("#canvas").height() * 100 - 10;
            color = $('.jscolor').val();
            textoutput = document.getElementById('jstextbox').value;
            size = $('#custom-handle').html();
            console.log("textoutput - " + textoutput);

            var div = document.createElement('div');
            div.style.fontFamily = "verdana";
            div.style.position = "absolute";
            div.style.left = x + "%";
            div.style.top = y + "%";
            div.style.color = color;
            div.style.fontSize = size;
            div.innerHTML = textoutput;

            $("#canvas").append(div);
            teid++;
            textElements[teid] = {"x": x, "y": y, "color": color, "fontSize": size, "output": textoutput};
            //console.log(textElements);
            // SOCKET EMIT HERE (textElements)


        });
    }

    else {
        $("#canvas")
            .mousemove(function() {
                if (moving) {

                    x = event.clientX / $("#canvas").width() * 100 - 22;     // Get the horizontal coordinate
                    y = event.clientY / $("#canvas").height() * 100 - 10;     // Get the vertical coordinate
                    did++;


                    color = $('.jscolor').val();
                    size = $('#custom-handle').html();
                    currentElement[did] =  {"x": x, "y":y, "bgcolor":color, "size":size};

                    $("#canvas").append("<div class='circle beid"+beid+"' style='position: absolute; top: "+(y)+"%; left: "+(x)+"%; background-color:"+color+"; border-radius: 50px; width: "+size+"px; height: "+size+"px'></div>");
                }
            })
            .mousedown(function() {
                //Text tool still relies on size, colour and text input but can't be dragged
                //Different behaviour required
                moving = true;
                did = 0;
                currentElement = {};
                beid = parseInt((Math.random() * 100000) + 1);
                $("#canvas").css("cursor","default");
            })
            .mouseup(function() {
                moving = false;
                //console.log(brushElements);
                brushElements[beid] = currentElement;
                socket.emit('newstroke', {"strokeID": beid, "data": currentElement});
            });
    }


}


