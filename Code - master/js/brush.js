$( function() {
    var handle = $( "#custom-handle" );
    $( "#slider" ).slider({
        value: '20',
        create: function() {
            handle.text( $( this ).slider( "value" ) );
        },
        slide: function( event, ui ) {
            handle.text( ui.value );
        }
    });
} );

$(document).ready(function(){

    // ----------------------------------PAINTBRUSH--------------------------------------
    var moving = false;
    var x;
    var y;
    var beid = 0; // brushElement ID
    var did; // dot ID
    var color;
    var size;
    var brushElements = {};
    var currentElement;
    $("#canvas")
        .mousemove(function() {
            if (moving) {
                //var msg = "Handler for .mousemove() called at ";

                x = event.clientX / $("#canvas").width() * 100 - 22;     // Get the horizontal coordinate
                y = event.clientY / $("#canvas").height() * 100 - 10;     // Get the vertical coordinate
                did++;


                color = $('.jscolor').val();
                size = $('#custom-handle').html();
                currentElement[did] = {"x": x, "y":y, "bgcolor":color, "size":size};

                $("#canvas").append("<div class='circle' style='position: absolute; top: "+(y)+"%; left: "+(x)+"%; background-color:"+color+"; border-radius: 50px; width: "+size+"px; height: "+size+"px'></div>");
            }
        })
        .mousedown(function() {
            moving = true;
            beid++;
            did = 0;
            currentElement = {};
        })
        .mouseup(function() {
            moving = false;
            console.log(beid);
            brushElements[beid] = currentElement;
            console.log(brushElements);
        });
    // --------------------------------/PAINTBRUSH------------------------------------------




    // -----------------------------------BUCKET--------------------------------------------


    // ----------------------------------/BUCKET--------------------------------------------
});
