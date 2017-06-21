Titan.popup = {
	success: function ( body, time) {
		Titan.PopupC.create('success', 'success', body, 'ok', time);
	},
	info: function ( body, time) {
		Titan.PopupC.create('info', 'info', body, 'info-sign', time);
	},
	warning: function (body, time) {
		Titan.PopupC.create('warning', 'warning', body, 'warning-sign', time);
	},
	danger: function ( body, time) {
		Titan.PopupC.create('danger', 'danger', body, 'fire', time);
	},
	error: function ( body, time) {
		Titan.PopupC.create('danger', 'danger', body, 'fire', time);
	},
}; 
Titan.PopupC = {
	create : function (classCss, title, body, icon, time ) {
		var html =	'<div class=" alert alert-' + classCss + ' alert-dismissible" role="alert">'+
		'<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'+
		'<strong>' +((icon)? '<span class="glyphicon glyphicon-' + icon + '"></span> ':' ') + title + '</strong> ' + body +
		'</div></br>';
		time = time || 4000;
		var container = $('div#titan-popup');
		if (container.length > 0) {
			var alert = $(html);
			container.append(alert);
			alert.effect('slide');
			if (time)
				setTimeout(function(){alert.effect('fold', function () {
					alert.remove();
					container.find('.ui-effects-wrapper').remove();
			});}, time);
		} else{
			var container = $('<div id="titan-popup"></div>');
			container.show();
			$('body').append(container);
			var container = $('div#titan-popup');
			var alert = $(html);
			container.append(alert);
			alert.effect('slide');
			if (time)
				setTimeout(function(){alert.effect('fold', function () {
					alert.remove();

					container.find('.ui-effects-wrapper').remove();
				});}, time);
		}
	}
};