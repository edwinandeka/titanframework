/**
 *
 * @class Titan
 * @author edwinandeka@gmail.com.com (Edwin Ramiro Ospina Ruiz )
 * @date 08-jun-2015
 * @version 1.0
 *
 * @license Derechos Reservados de Autor (C) DOWESOFT (dowesoft.com)
 */

var Titan = {};
Titan.modules = {};
Titan.app = {};
Titan.global = {};

if (typeof APP_NAME != 'undefined') {
	Titan.host = '//'+location.host+'/' + APP_NAME;
}else {
	var APP_NAME = location.pathname.replace(/\//gmi, '');
	Titan.host = '//'+location.host + location.pathname;

	console.info('Por favor define "APP_NAME" el nombre de la app en el archivo main.js ');
}
