$(function(){
	app.initialize();
}

var app = {
	ajax: 'http://bx.ftoroplast4.ru/local/mobile/formoplast.php',

	initialize: function() {
		this.bindEvents();
	},

	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
		document.addEventListener('resume', this.onDeviceReady, false);
	},

	onDeviceReady: function() {
		$('#mainContent').html('');
		$.ajax({
			url: 'http://melexo.ru/mobile/',
			success: function(html) {
				var start = html.search(/<body>/);
				var end = html.search(/<\/body>/);
				var result = html.substr(start + 6, end - start - 6);

				$('#mainContent').html(result);
			}
		})
	},
}; 
