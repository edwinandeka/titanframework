/**
 * @author edwin.ospina@iptotal.com (Edwin Ramiro Ospina Ruiz )
 * @date 29-may-2014
 * @version 1.0
 *
 * @license Derechos Reservados de Autor (C) DOWESOFT (dowesoft.com)
 */
 Array.prototype.contains = function (element) {
 "use strict";
    return this.indexOf(element) > -1;
 };
/**
 *
 * @author edwin.ospina@iptotal.com (Edwin Ramiro Ospina Ruiz )
 * @date 29-may-2014
 * @version 1.0
 *
 * @license Derechos Reservados de Autor (C) DOWESOFT (dowesoft.com)
 */
 function create( obj ) {
 	return $.extend( {}, obj );;
 }
 String.prototype.contains = function(it) { return this.indexOf(it) != -1; };
 String.prototype.capitalize =  function() {
 	return this.charAt(0).toUpperCase() + this.slice(1);
 }
 String.prototype.toName =  function() {
 	var arr = this.split(' ');
 	var tem = '';
 	for(var i in arr) {
 		if (arr[i].capitalize) 
 		tem += arr[i].capitalize() + ' ';
 	}
 	return tem;
 }