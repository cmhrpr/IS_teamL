$(document).ready(function(){
$('#cmd').click(function(){
html2canvas($('#canvas'), 
		{
		  onrendered: function (canvas) {
			var a = document.createElement('a');
			// toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
			a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
			a.download = 'canvas.jpg';
			a.click();
		  }
		});
	});
});
	