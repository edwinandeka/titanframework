/**
 *
 * @class Titan.modules
 * @author edwinandeka@gmail.com.com (Edwin Ramiro Ospina Ruiz )
 * @date 08-jun-2015
 * @version 1.0
 *
 * @license Derechos Reservados de Autor (C) DOWESOFT (dowesoft.com)
 */

Titan.modules.create = function (obj) {
	if ( 'name' in obj){
		Titan.modules[obj.name.capitalize()] = obj;
	} else {
		Titan.Message.error('No se resgistró un nombre "name" en el modulo');
	}
	
};

/**
 *
 * @class Titan.init
 * @author edwinandeka@gmail.com.com (Edwin Ramiro Ospina Ruiz )
 * @date 08-jun-2015
 * @version 1.0
 *
 * @license Derechos Reservados de Autor (C) DOWESOFT (dowesoft.com)
 * 
 * @name init
 * @description inicial de la app inicia la carga de las aplicaciones
 * @return {void}
 */
Titan.init = function () {
	
	WebService.post({app: 'login'}).done(function(data) {
		Titan.render($('body'), data);
	});
 	
};

Titan.mainframe = function () {
	
	WebService.post({app: 'mainframe'}).done(function(data) {
		Titan.render($('body'), data);
	});
 	
};

Titan.loadApp = function (id, container) {
	
	WebService.post({app: id }).done(function(data) {
		Titan.render(container, data);
	});
 	
};

Titan.loadPartial = function (name, container, path, params) {
	
	WebService.post({partialname: name, PATH: path }).done(function(data) {
		data.params = params;
		Titan.render(container, data, );
	});
 	
};