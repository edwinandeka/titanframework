/**
 *
 * @class Titan events
 * @author edwinandeka@gmail.com.com (Edwin Ramiro Ospina Ruiz )
 * @date 08-jun-2015
 * @version 1.0
 *
 * @license Derechos Reservados de Autor (C) DOWESOFT (dowesoft.com)
 */

Titan.click =  function ( obj, func, contex) {
	if (contex[obj]) {
		contex[obj].unbind('click').on('click', contex[func].bind(contex));
	}
};

Titan.keyup =  function ( obj, func, contex) {
	if (contex[obj]) {
		contex[obj].unbind('keyup').on('keyup', contex[func].bind(contex));
	}
};

Titan.keypress =  function ( obj, func, contex) {
	if (contex[obj]) {
		contex[obj].unbind('keypress').on('keypress', contex[func].bind(contex));
	}
};

Titan.change =  function ( obj, func, contex) {
	if (contex[obj]) {
		contex[obj].unbind('change').on('change', contex[func].bind(contex));
	}
};