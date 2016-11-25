io.on('existing_users', function (data) {
    console.log(data);
    // Need to receive beid, teid, data of both
});

io.on('draw_line', function (data) {
    console.log("Client received new line!")
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