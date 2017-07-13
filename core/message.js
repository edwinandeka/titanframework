/**
 *
 * @class Titan.message
 * @author edwinandeka@gmail.com.com (Edwin Ramiro Ospina Ruiz )
 * @date 08-jun-2015
 * @version 1.0
 *
 * @license Derechos Reservados de Autor (C) DOWESOFT (dowesoft.com)
 */

Titan.message = {

	/**
	 * crea un dialogo modal de bootstrap tipo info 
	 * @param  {string} title titulo del dialogo
	 * @param  {string} body  mensaje del dialogo
	 * @return {void}       
	 */
	info: function (title, body) {
		// swal(title, body, "info");
		Titan.Dialog.create('info', title, body);
		
		
	},

	/**
	 * crea un dialogo modal de bootstrap tipo info 
	 * @param  {string} title titulo del dialogo
	 * @param  {string} body  mensaje del dialogo
	 * @return {void}       
	 */
	warning: function (title, body) {
		// swal(title, body, "warning");
		Titan.Dialog.create('warning', title, body);


	},

	/**
	 * crea un dialogo modal de bootstrap tipo info 
	 * @param  {string} title titulo del dialogo
	 * @param  {string} body  mensaje del dialogo
	 * @return {void}       
	 */
	error: function (title, body) {
		// swal(title, body, "error");
		Titan.Dialog.create('error', title, body);

	},

	/**
	 * crea un dialogo modal de bootstrap tipo info 
	 * @param  {string} title titulo del dialogo
	 * @param  {string} body  mensaje del dialogo
	 * @return {void}       
	 */
	success: function (title, body) {
		Titan.Dialog.create('success', title, body);
		// swal(title, body, "success");
	},

	/**
	 * crea un dialogo modal de bootstrap tipo info 
	 * @param  {string} title titulo del dialogo
	 * @param  {string} body  mensaje del dialogo
	 * @return {void}       
	 */
	primary: function (title, body) {
		Titan.Dialog.create('primary', title, body);
	},

	/**
	 * crea un mensaje de confirmacion
	 * @param  {string} title titulo del dialogo
	 * @param  {string} body  mensaje del dialogo
	 * @param  {Function} callback funcion que se ejecutará en caso de aceptar
	 * @param  {object}   context  contexto de la funcion callback
	 * @param  {string}   btnYes   texto del boton ok
	 * @param  {string}   btnNO    texto del boton cancel
	 * @return {void}            
	 */
	confirmation: function (title, body, callback, context,btnYes, btnNO) {
		Titan.Dialog.create('primary', title, body, callback,context,btnYes, btnNO);
		// swal({
		//   title: title,
		//   text: body,
		//   type: "info",
		//   showCancelButton: true,
		//   confirmButtonClass: "btn-primary",
		//   confirmButtonText: btnYes,
  // 		  cancelButtonText: btnNO,
		//   closeOnConfirm: false,
  // 		  showLoaderOnConfirm: true
		// }, callback.bind(context));
	},

	confirmationModal: function (title, body, callback, context,btnYes, btnNO) {
		Titan.Dialog.create('primary', title, body, callback,context,btnYes, btnNO);
		
	},
}; 


/**
 *
 * @class Titan.Dialog
 * @author edwinandeka@gmail.com.com (Edwin Ramiro Ospina Ruiz )
 * @date 08-jun-2015
 * @version 1.0
 *
 * @license Derechos Reservados de Autor (C) DOWESOFT (dowesoft.com)
 */

Titan.Dialog = {

	/**
	 * crea un mensaje generico con los parámetros pasados a la funcion create
	 * @param  {string} title titulo del dialogo
	 * @param  {string} body  mensaje del dialogo
	 * @param  {Function} callback funcion que se ejecutará en caso de aceptar
	 * @param  {object}   context  contexto de la funcion callback
	 * @param  {string}   btnYes   texto del boton ok
	 * @param  {string}   btnNO    texto del boton cancel
	 * @return {void}            
	 */
	create : function (classCss, title, body, callback, context,btnYes, btnNO) {
		
		var html =	'<div  class="modal fade" id="titan-message-modal-id" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
		'<div class="modal-dialog">'+
		'<div class="modal-content">'+
		'<div class="modal-header ' + ((classCss)? classCss: '') + '">'+
		'<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'+
		'<h4 class="modal-title">' + ((title)? title: '' ) + '</h4>'+
		'</div>'+
		'<div class="modal-body">'+
		((body)? body: '' ) +
		'</div>'+
		'<div class="modal-footer">'+
		((callback)? '<button type="button" class="btn btn-default" data-dismiss="modal">' + ((btnNO)? btnNO : 'Cancelar' ) + ' </button>': '' ) +
		'<button type="button" id="titan-message-modal-ok" data-dismiss="modal" class="btn btn-default" >' + ((btnYes)? btnYes : 'Aceptar' ) + '</button>'+
		'</div>'+
		'</div><!-- /.modal-content -->'+
		'</div><!-- /.modal-dialog -->'+
		'</div><!-- /.modal -->';

		/*
			valida si se ha creado antes el contenedor de mensajes, de no ser asi lo crea
		 */
		var container = $('div#titan-message');

		if (container.length <= 0) {
			var container = $('<div id="titan-message"></div>');
			$('body').append(container);
			container = $('div#titan-message');
		}

		container.html(html);
		var bodyContainer = container.find('.modal-body');
		bodyContainer.html(body);
		$('#titan-message-modal-id').modal('show');

		//enciende el evento en caso de existir
		if (callback) {
			$('#titan-message-modal-ok').off('click').on('click', (context)? callback.bind(context) : callback );
		};
	}
};