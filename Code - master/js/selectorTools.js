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
                $("."+e.target.classList[1]).remove();

                // SOCKET EMIT HERE (remove beid from the dictionary)
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