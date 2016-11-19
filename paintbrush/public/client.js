document.addEventListener("DOMContentLoaded", function() {
   var mouse = { 
      click: false,
      move: false,
      pos: {x:0, y:0},
      pos_prev: false
   };
   // get canvas element and create context
   var canvas  = document.getElementById('drawing');
   var context = canvas.getContext('2d');
   var width   = window.innerWidth;
   var height  = window.innerHeight;
   var socket  = io.connect();
   var $color =  document.getElementById('color');
   var $size  = document.getElementById('size');
   var $clear = document.getElementById('clear'); 
   var $count = document.getElementById('count');
   
   

   // set canvas to full browser width/height
   canvas.width = width;
   canvas.height = height;

   // register mouse event handlers
   canvas.onmousedown = function(e){ mouse.click = true; };
   canvas.onmouseup = function(e){ mouse.click = false; };
   
   // get the starting size
	size = $size.options[$size.selectedIndex].value;
	color = $color.options[$color.selectedIndex].value.toLowerCase();

   canvas.onmousemove = function(e) {
      // normalize mouse position to range 0.0 - 1.0
      mouse.pos.x = e.clientX / width;
      mouse.pos.y = e.clientY / height;
      mouse.move = true;
   };
   
   $size.addEventListener('change', function(e) {
		size = $size.options[$size.selectedIndex].value
		touchdown = false
	}, false)

	$color.addEventListener('change', function(e) {
		color = $color.options[$color.selectedIndex].value.toLowerCase()
		touchdown = false
	}, false)
   
   $clear.addEventListener('click', function(e) {
		clearScreen()
		socket.emit('clear');
	}, false)


   // draw line received from server
	socket.on('draw_line', function (data) {
      var line = data.line;
      context.beginPath();
	  context.lineWidth = line[2];
	  context.strokeStyle = line[3];
      context.moveTo(line[0].x * width, line[0].y * height);
      context.lineTo(line[1].x * width, line[1].y * height);
      context.stroke();
   });
   
   socket.on('clear', function () {
      clearScreen()
   });
   
   socket.on('message', function(data){
	   $count.innerHTML = 'Current Users: ' + data.count;
   });
   
   function clearScreen() {
		context.clearRect(0,0,width,height)
	}
   
   // main loop, running every 25ms
   function mainLoop() {
      // check if the user is drawing
      if (mouse.click && mouse.move && mouse.pos_prev) {
         // send line to to the server
         socket.emit('draw_line', { line: [ mouse.pos, mouse.pos_prev, size, color] });
         mouse.move = false;
      }
      mouse.pos_prev = {x: mouse.pos.x, y: mouse.pos.y};
      setTimeout(mainLoop, 25);
   }
   mainLoop();
});



function dlCanvas() {
	  var canvas = document.getElementById('drawing');
	  var dt = canvas.toDataURL('image/png');
	  /* Change MIME type to trick the browser to downlaod the file instead of displaying it */
	  dt = dt.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');

	  /* In addition to <a>'s "download" attribute, you can define HTTP-style headers */
	  dt = dt.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png');

	  this.href = dt;
};
window.onload=function(){
	document.getElementById("dl").addEventListener('click', dlCanvas, false);
}
	

