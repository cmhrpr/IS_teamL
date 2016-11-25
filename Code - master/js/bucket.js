function initBucket(){
    console.log("tool - bucket");
    $("#canvas").unbind();
    $("#canvas").click(function() {
        $("#canvas").css("background-color",$('.jscolor').val());
        // SOCKET EMIT HERE
    })
}