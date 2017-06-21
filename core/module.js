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
	
	if ( 'name' in obj)
		Titan.modules[obj.name.capitalize()] = obj;
	else
		Titan.Message.error('No se resgistró un nombre "name" en el modulo');
	
};