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

                active = e.target.classList[1];
                console.log(active);
                $("."+active).css("border", "3px dotted red");

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
                console.log($(".jscolor"));
                $(".jscolor").val(rgb2hex(e.target.style.backgroundColor));
                $("#colorpicker").jscolor.show();
                $(".jscolor").click();
                $(".jscolor").mouseup();
                // val(e.target.style.backgroundColor);
                //$("."+active).css("border", "3px dotted red");

            });
            break;
        default:
            console.log("???@initSelector");
    }


}