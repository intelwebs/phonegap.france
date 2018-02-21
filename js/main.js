$(function(){
	//navigator.notification.prompt('Введите пароль', function(result) {}, 'Идентификация', ['Ввод']);

	$.ajax({
		url: app.ajax,
		type: 'POST',
		data: {op: 'deviceready'},
		dataType: 'json',
		success: function(json) {
			$('#mounth_rez').html(json.MONTH_REZ);
			$('#yestoday_rez').html(json.YESTODAY_REZ);
			$('#today_rez').html(json.TODAY_REZ);
			$('#list_rez').html(json.LIST_REZ);
		}
	});

	$('#mounth_rez').data('swipe-left', function(obj) { app.changeMonth(obj, 1); });
	$('#mounth_rez').data('swipe-right', function(obj) { app.changeMonth(obj, -1); });

	$('body').swipe({
		swipeLeft: function(event, direction, distance, duration, fingerCount, fingerData) {
			console.log(event);
			for (var i in event.path) {
				if (typeof ($(event.path[i]).data('swipe-' + direction)) !== 'function') continue;

				$(event.path[i]).data('swipe-' + direction)(event.path[i]);
			}
		},
		swipeRight: function(event, direction, distance, duration, fingerCount, fingerData) {
			console.log(event);
			for (var i in event.path) {
				if (typeof ($(event.path[i]).data('swipe-' + direction)) !== 'function') continue;

				$(event.path[i]).data('swipe-' + direction)(event.path[i]);
			}
		},
	});
});

app.initialize();

var app = {
	ajax: 'http://bx.ftoroplast4.ru/local/mobile/formoplast.php',

	initialize: function() {
		this.bindEvents();
	},

	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},

	onDeviceReady: function() {
		app.receivedEvent('deviceready');
	},

	receivedEvent: function(id) {
		console.log('Received Event: ' + id);
	},

	changeMonth: function(obj, dir) {
		console.log(obj);
		var id = $('.container', obj).data('id');
		$.ajax({
			url: app.ajax,
			type: 'POST',
			data: {op: 'changeMonth', dir: dir, id: id},
			dataType: 'json',
			success: function(json) {
				$('#mounth_rez').html(json.MONTH_REZ);
			}
		});
	}
}; 
