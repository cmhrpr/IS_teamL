$(document).ready(function(){
    var moving = false;

    var isDragging = false;
    $("#canvas").mousemove(function() {
        if (moving) {
            var msg = "Handler for .mousemove() called at ";
            console.log(event.pageX + ", " + event.pageY);
            var x = event.clientX;     // Get the horizontal coordinate
            var y = event.clientY;     // Get the vertical coordinate
            $("#canvas").append("<div class='circle' style='position: absolute; top: "+(y- 130)+"px; left: "+(x-310)+"px; background-color:blue; border-radius: 50px; width: 20px; height: 20px'></div>");
        }

    });

    $("#canvas").mousedown(function() {
        moving = true;

    })

    $("#canvas").mouseup(function() {
        moving = false;

    })


});
