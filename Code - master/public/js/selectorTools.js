function initSelector(tool){
    $("#canvas").unbind();
    console.log("tool - "+ tool);
    var active;
    switch (tool) {

        case "magic":
            $("#canvas").click(function(e) {
                $("."+active).css("border", "none");
                active = e.target.classList[1];
                console.log(active);
                $("."+active).css("border", "3px dotted red");

            });
            break;
        case "eraser":
            $("#canvas").click(function(e) {

                var beid = e.target.classList[1];
                beid = beid.split("beid");
                console.log(beid);
                $("."+e.target.classList[1]).remove();
                socket.emit('remove_stroke', {"strokeID": beid[1]});
                delete brushElements[beid[1]];
                //SOCKET EMIT HERE (remove beid from the dictionary)
            });
            break;
        case "select":
            $("#canvas").click(function(e) {
                $("."+active).css("border", "none");
                active = e.target.classList[1];
                console.log(active);
                $("."+active).css("border", "3px dotted red");

            });
            break;
        case "dropper":
            $("#canvas").click(function(e) {
                $(".jscolor").val(rgb2hex(e.target.style.backgroundColor));
                document.getElementById('colorpicker').jscolor.fromString(rgb2hex(e.target.style.backgroundColor));
            });
            break;
        default:
            console.log("???@initSelector");
    }


}