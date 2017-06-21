/**
 *
 * @class Titan Validate
 * @author edwinandeka@gmail.com.com (Edwin Ramiro Ospina Ruiz )
 * @date 08-jun-2015
 * @version 1.0
 *
 * @license Derechos Reservados de Autor (C) DOWESOFT (dowesoft.com)
 */

Titan.validate = {

 	number: {
		expression  : /^\d+$/, /*solo numeros,*/
		message     : 'El valor debe ser un número.'
	},
	decimal: {
		expression: /^(\d+\.?\d*|\.\d+)$/,
		message: 'El valor debe ser decimal.'
	},
	email: {
		expression  : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/, 
		message     : 'El valor debe ser un email "ejemplo@gmail.com"'
	},
	letter: {
		expression  : /^([a-z])*$/, /*solo letras a - z en minuscula*/
		message     : 'solo letras en minúscula.'
	},
	letter_upper: {
		expression  : /^([A-Z])*$/,  /*solo letras A -Z en mayuscula,*/
		message     : 'solo letras en mayúscula.'
	},
	url: {
		expression  : /^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)( [a-zA-Z0-9\-\.\?\,\'\/\\\+&%\$#_]*)?$/,
		message     : 'ejemplo: http://www.iptotal.com'
	},
	date: {
		expression  : /^\d{1,2}\/\d{1,2}\/\d{2,4}$/,/*año/mes/dia*/
		message     : 'año/mes/día'
	},
	time: {
		expression  : /^(0[1-9]|1\d|2[0-3]):([0-5]\d):([0-5]\d)$/,/*hora/minutos/segundos*/
		message     : 'hora/minutos/segundos'
	},
	phone : {
		expression  : /^[0-9]{2,3}-? ?[0-9]{6,7}$/,
		message     : 'El valor debe contener 10 dígitos.'
	},
	ip : {
		expression  : /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/,
		message     : 'No cumple con el formato 0.0.0.0'
	},
	mac: {
		expression: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/,
		message: 'No cumple con el formato FF:FF:FF:FF:FF:FF'
	},
	empty : {
		expression  : '/[a-z]/i/',/*validación campos vacios*/
		message     : 'El valor no debe ser vacío.'
	},
	password : {
		expression  : '',/*validación campos vacios*/
		message     : 'El valor no debe ser vacío.'
	},
	spaces : {
		expression  :  /^[a-zA-Z0-9]+$/,/*validación para los espacios en blanco.*/
		message     : 'El valor no debe contener espacios en blanco.'
	},
	text : {
		expression  :  /^[\n\r]|.$/,/*validación de texto alfanumerico.*/
		message     : 'El valor solo debe contener datos Alfanuméricos.'
	}
};
