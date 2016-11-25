
io.on('existing_users', function (data) {
    console.log(data);
    // Need to receive beid, teid, data of both
});

io.on('draw_line', function (data) {

    console.log(data);
    // Need to receive beid, teid, data of both
    if (data in brushElements){
        console.log("Already there!");
    }
});