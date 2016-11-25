socket.on('existing_users', function (data) {
    console.log(data);
    // Need to receive beid, teid, data of both
});

socket.on('draw_line', function (data) {
    console.log("Client received new line!");
    console.log(data);
    // Need to receive beid, teid, data of both
    if (data in brushElements){
        console.log("Already there!");
    }
    else{
        brushElements[Object.keys(data)] = data[Object.keys(data)];
        console.log(data);

        for (var el in data[Object.keys(data)]) {
            console.log("DRAW BITCH");
            var y = data[Object.keys(data)][el];
            $("#canvas").append("<div class='circle beid"+Object.keys(data)+"' style='position: absolute; top: "+(data[Object.keys(data)][el]['y'])+"%; left: "+(data[Object.keys(data)][el]['x'])+"%; background-color:"+data[Object.keys(data)][el]['bgcolor']+"; border-radius: 50px; width: "+data[Object.keys(data)][el]['size']+"px; height: "+data[Object.keys(data)][el]['size']+"px'></div>");
        }

    }
});

socket.on('draw_text', function (data) {
    var el = Object.keys(data)[0];
    var div = document.createElement('div');
    div.style.fontFamily = "verdana";
    div.style.position = "absolute";
    div.style.left = data[el]['x'] + "%";
    div.style.top = data[el]['y']+ "%";
    div.style.color = data[el]['color'];
    div.style.fontSize = data[el]['fontSize'];
    div.innerHTML = data[el]['output'];
    $("#canvas").append(div);
});

socket.on('wipe_stroke', function (data) {
    $(".beid"+data).remove();
});
