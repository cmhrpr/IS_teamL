function initTool(a) {
    switch (a) {
        case "brush":
            initBrush("brush");
            break;
        case "pencil":
            initBrush("pencil");
            break;
        case "spray":
            initBrush("spray");
            break;
        case "bucket":
            initBucket();
            break;
        case "eraser":
            initSelector("eraser");
            break;
        case "magic":
            initSelector("magic");
            break;
        case "dropper":
            initSelector("dropper");
            break;
        default:
            console.log(a);
    }


}

$(document).ready(function(){
    var active = "brush";
    $("#"+active).css("background-color", "#D8A910");
    initTool(active, $("#"+active));
    $(".tools").click(function() {
        $("#"+active).css("background-color", "#700A6D");
        active = $(this)[0].id;
        $("#"+active).css("background-color", "#D8A910");
        initTool(active, $(this));
    })
});