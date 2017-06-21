/**
 *
 * @class Titan Framework
 * @author edwinandeka@gmail.com.com (Edwin Ramiro Ospina Ruiz )
 * @date  2016-09-14 23:49:41
 * @version titan-framework
 *
 * @license Derechos Reservados de Autor (C) DOWESOFT (dowesoft.com)
 */
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

/*=======================================================================================*/
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
/*=======================================================================================*/
/**
 *
 * @class Titan.lang
 * @author edwinandeka@gmail.com.com (Edwin Ramiro Ospina Ruiz )
 * @date 08-jun-2015
 * @version 1.0
 *
 * @license Derechos Reservados de Autor (C) DOWESOFT (dowesoft.com)
 */

Titan.lang = function () {
    
	var idiomaNavegador = new String;
	if (navigator.language){
		idiomaNavegador = navigator.language;
        // En este caso, el idioma devuelto puede contener el 
        // subcódigo de idioma (p.ej. "es-ES").
    } else {
  	     idiomaNavegador = navigator.browserLanguage;
        // En este caso, el idioma devuelto solo conteniene el 
        // código de idioma (p.ej. "es")
    }
  
    if (idiomaNavegador.contains('es'))
  	     return 'es';
    if (idiomaNavegador.contains('en'))
  	     return 'en';
    
    return idiomaNavegador;
};
/*=======================================================================================*/
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
	contex[obj].unbind('click').on('click', contex[func].bind(contex));
};

Titan.keyup =  function ( obj, func, contex) {
	contex[obj].unbind('keyup').on('keyup', contex[func].bind(contex));
};

Titan.keypress =  function ( obj, func, contex) {
	contex[obj].unbind('keypress').on('keypress', contex[func].bind(contex));
};

Titan.change =  function ( obj, func, contex) {
	contex[obj].unbind('change').on('change', contex[func].bind(contex));
};
/*=======================================================================================*/
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
/*=======================================================================================*/
/**
 *
 * @class view
 * @author edwinandeka@gmail.com.com (Edwin Ramiro Ospina Ruiz )
 * @date 17-oct-2014
 * @version 1.0
 *
 * @license Derechos Reservados de Autor (C) doweSoft 
 * @name view
 * @description Inicializa los eventos que cargan el módulo
 * @param {string} module, nombre del módulo
 * @param {string} view, nombre de la vista a  cargar
 * @param {JQuery Object} containerId, objeto sobre el cual se cargará el modulo
 * @return {void} 
 */
 Titan.view = function(module, view, containerId, params) {


	/**
	 *
	 * @class Render
	 * @author edwinandeka@gmail.com.com (Edwin Ramiro Ospina Ruiz )
	 * @date 17-oct-2014
	 * @version 1.0
	 *
	 * @license Derechos Reservados de Autor (C) DOWESOFT (dowesoft.com)
	 */
	 var Render = {
		//servidor del cúal se cargará el módulo
		//host : 'http://localhost/frontend_directorio',
		host : Titan.host,
		//contenedor en el cúal se cargará el módulo
		container: null,
		//nombre del módulo
		module: '',
		/**
		 * @name view
		 * @description Inicializa los eventos que cargan el módulo
		 * @param {string} module, nombre del módulo
		 * @param {string} view, nombre de la vista a  cargar
		 * @param {JQuery Object} containerId, objeto sobre el cual se cargará el modulo
		 * @return {void} 
		 */
		 view: function  (module, view, containerId, params) {
		 	this.module = module;
		 	this.view = view;
		 	this.params = params;
		 	if (typeof(containerId) == 'undefined') 
		 		this.container = $('#render');
		 	else
		 		this.container = $('#'+containerId);
		 	var d = new Date();
		 	this.time = d.getTime();
		 	this.loadhtml();	
		 },
		/**
		 * @name loadhtml
		 * @description Inicia la carga del html  del módulo
		 * @return {void} 
		 */
		 loadhtml: function  () {
		 	var a = $.get(this.host + '/modules/' + this.module + '/'+ this.view + '/' + this.view + '.html?'+ this.time, function(data) {
		 		this.container.html(data);
		 		var content = $('<div></div>');

		 		this.idContainerHtml = '' + this.module + '_' + this.view +'_module_container';
		 		content.attr('id', this.idContainerHtml);
		 		content.addClass('module-container');

		 		for(var key in this.params)
		 			if(key != 'contains'){
		 				var exp = new RegExp('{{' + key + '}}', "gmi");
		 				data = data.replace(exp , this.params[key] );
		 			}


		 			content.append(data);
		 			this.container.html(content);
		 			this.container = content;
		 			//console.log("load html module: " + this.module);
		 		}.bind(this));
		 	a.fail(function(response) {
		 		console.log("error >>> ocurrió un error mientras se cargaba el html para el modulo " + this.module );
		 	});
		 	a.done(function(response) {
		 		this.loadcss();
		 	}.bind(this));
		 },
		/**
		 * @name loadcss
		 * @description Inicia la carga del css del módulo
		 * @return {void} 
		 */
		 loadcss: function  () {
		 	var url = this.host + '/modules/' + this.module + '/'+ this.view + '/' + this.view  + '.css?' + this.time;
		 	
		 	$.ajax({
		 		url: url,
		 		type:'get',
		 		success: function(cssContent) {
		 			var reg =  /[\.#\w\*][\.#\w\s-~:\n,_>\*\+\]\["\/=\^\$\(\)]*\{[\n\s\w-:#;%\d\(,\.\)"\*\/]*}/gmi;
		 			
		 			var cssArray = cssContent.match(reg);
		 			if (cssArray)
		 				for (var i = cssArray.length - 1; i >= 0; i--) {
		 					cssContent = cssContent.replace(cssArray[i], '#'+this.idContainerHtml + ' ' + cssArray[i]); 
		 				}

		 				var s = document.createElement('style');
		 				s.setAttribute('type', 'text/css');
		 				s.innerHTML = cssContent;
		 				document.getElementsByTagName("head")[0].appendChild(s);

		 			}.bind(this)
		 		});
		 	
		 	
		 	this.loadjs();
		 },
		/**
		 * @name loadjs
		 * @description Inicia la carga del js del módulo
		 * @return {void} 
		 */
		 loadjs: function  () {
		 	var url = this.host + '/modules/' + this.module + '/'+ this.view + '/' + this.view  + '.js?' + this.time;
		 	/*if (Titan.modules[this.view.capitalize()]) {

		 		Titan.modules[this.view.capitalize()].ready(this.params||{});
		 	};*/
		 	$.ajax({
		 		url: url,
		 		type:'HEAD',
		 		error: function() {
		 			/* Act on the event */
		 		},
		 		success: function() {
		 			var a = $.getScript(url);
		 			//console.log("load js : " + url);
		 			a.done(function(){
		 				function getFuntion(selector) {
		 					
		 					if (selector.contains('#')|| selector.contains('.')) {

		 					} else {
		 						selector = '#' + selector;
		 					}

		 					var component = this.main_container.find('' + selector);
		 					component.context = this;
		 					return component;
		 				}

		 				function getContainer() {
		 					return this.main_container;
		 				}
		 				
		 				var obj = Titan.modules[this.view.capitalize()];
		 				obj.main_container = this.container;
		 				obj.getContainer = getContainer;
		 				obj.main_container.css('height', '100%').css('width', '100%');
		 				obj.get = getFuntion;
		 				obj.params = this.params;
		 				

		 				if(!Titan.app[this.module])
		 					Titan.app[this.module] = {};
		 				if (this.view == 'crud') {
		 					Titan.app[this.module][this.view+'_'+this.params.id] = obj;
		 				}else{
		 					Titan.app[this.module][this.view] = obj;
		 				}


		 				if ( 'ready' in obj) {
		 					obj.params = this.params||{};
		 					obj.ready();
		 					if ( 'initEvents' in obj){
		 						obj.initEvents();	
		 					}else{
		 						console.log('No se resgistró metodo iniciador de eventos "initEvents" en el modulo');
		 					}
		 				} else {
		 					Titan.Message.error('No se resgistró un constructor "ready" en el modulo');
		 				}

		 				//localStorage.app = JSON.stringify(Titan.app);
				//delete this;
			}.bind(this));
		 		}.bind(this)
		 	});

		 },
		};
		var loadBots = [];
		var loadBot = create(Render);
		loadBot.view(module, view, containerId, params);
		loadBots.push(loadBot);
	};
/*=======================================================================================*/
/**
 * @class WebService
 * @author edwin.ospina@iptotal.com (Edwin Ramiro Ospina Ruiz )
 * @date 29-may-2014
 * @version 1.0
 *
 * @license Derechos Reservados de Autor (C) DOWESOFT (dowesoft.com)
 */
 var WebService = {
	//servidor hacia el que van dirigidas las peticiones
	host: '//'+location.host+ '/'+ APP_NAME +'/back/index.php',
	/**
	 * @name post
	 * @description Inicializa los eventos inicia reconstructMap que grafíca el mapa
	 * @param {String} webService , nombre del servicio web a consultar
	 * @param {object} params , data que se enviará al servidor ej: {id: 'EKA-1', username: 'edwin_eka'}
	 * @return {$Deferred}  
	 */
	 post: function  (params) {
	 	params.database_name = _database_name;
	 	return 	$.ajax({
	 		url: this.host ,
	 		type: 'POST',
	 		dataType: 'json',
	 		data: params,
	 	}).always(function(data, status){
	 		
	 		if (status == 'parsererror') {
	 			Titan.message.warning("Por favor contacte al Administrador", data.responseText);
	 			
	 		}else if (data.print_var) {
	 			Titan.message.warning("print_var", data.print_var);
	 		};
	 	});
	 },
	 /**
	 * @name get
	 * @description 
	 * @param {String} webService , nombre del servicio web a consultar
	 * @param {String} type , tipo de respuesta que se espera del servidor 'default: Intelligent Guess (Other values: xml, json, script, or html)'
	 * @return {$Deferred}  
	 */
	 get: function  (webService, type) {
	 	return 	$.ajax({
	 		url: this.host + '/' + webService,
	 		type: 'GET',
	 		dataType: type,
	 		data: params,
	 	});
	 },
	};
/*=======================================================================================*/
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
		Titan.Dialog.create('info', title, body);
	},

	/**
	 * crea un dialogo modal de bootstrap tipo info 
	 * @param  {string} title titulo del dialogo
	 * @param  {string} body  mensaje del dialogo
	 * @return {void}       
	 */
	warning: function (title, body) {
		Titan.Dialog.create('warning', title, body);
	},

	/**
	 * crea un dialogo modal de bootstrap tipo info 
	 * @param  {string} title titulo del dialogo
	 * @param  {string} body  mensaje del dialogo
	 * @return {void}       
	 */
	error: function (title, body) {
		Titan.Dialog.create('danger', title, body);
	},

	/**
	 * crea un dialogo modal de bootstrap tipo info 
	 * @param  {string} title titulo del dialogo
	 * @param  {string} body  mensaje del dialogo
	 * @return {void}       
	 */
	success: function (title, body) {
		Titan.Dialog.create('success', title, body);
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
		if (container.length > 0) {
			container.html(html);
			$('#titan-message-modal-id').modal('show');
		} else{
			var container = $('<div id="titan-message"></div>');
			$('body').append(container);
			var container = $('div#titan-message');
			container.html(html);
			$('#titan-message-modal-id').modal('show');
		}

		//enciende el evento en caso de existir
		if (callback) {
			$('#titan-message-modal-ok').off('click').on('click', (context)? callback.bind(context) : callback );
		};
	}
};
/*=======================================================================================*/
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
		time = time || 3000;
		var container = $('div#titan-popup');
		if (container.length > 0) {
			var alert = $(html);
			container.append(alert);
			alert.effect('slide');
			if (time)
				setTimeout(function(){alert.effect('fold', function () {alert.remove();});}, time);
		} else{
			var container = $('<div id="titan-popup"></div>');
			container.show();
			$('body').append(container);
			var container = $('div#titan-popup');
			var alert = $(html);
			container.append(alert);
			alert.effect('slide');
			if (time)
				setTimeout(function(){alert.effect('fold', function () {alert.remove();});}, time);
		}
	}
};