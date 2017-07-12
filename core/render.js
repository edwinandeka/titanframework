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
 Titan.render = function( containerId, data ) {

	

 	var view = data.view ; 
 	var controller = data.controller ; 
 	var style = data.style ;
 	var nameView = data.nameView;
 	var category = data.category;
 	var params = data.params || {};

 	var idContainerHtml = category + '-' + nameView +'-app-container';


 	var container;

 	if(containerId instanceof $){
 		container = containerId;
 	} else {

	 	if (typeof(containerId) == 'undefined') 
	 		container = $('#render');
	 	else
	 		container = $('#'+containerId);
	}



 	
	/**
	 * @name loadhtml
	 * @description Inicia la carga del html  del módulo
	 * @return {void} 
	 */
	 function loadhtml(data, params) {

 		var content = $('<div></div>');

 		content.attr('id',   idContainerHtml);
 		content.addClass('app-container');

 		for(var key in params) {
 			if(key != 'contains'){
 				var exp = new RegExp('{{' + key + '}}', "gmi");
 				data = data.replace(exp , params[key] );
 			}
 		}

		content.append(data);
		content.css('height', '100%').css('width', '100%');
		container.html(content);
		container = content;
 		
	 }


	/**
	 * @name loadcss
	 * @description Inicia la carga del css del módulo
	 * @return {void} 
	 */
	  function  loadcss(cssContent, params) {

		var reg =  /[\.#\w\*][\.#\w\s-~:\n,->\*\+\]\["\/=\^\$\(\)]*\{[\n\s\w-:#;%\d\(,\.\)"\*\/]*}/gmi;
		
		var cssArray = cssContent.match(reg);
		if (cssArray){
			for (var i = cssArray.length - 1; i >= 0; i--) {
				cssContent = cssContent.replace(cssArray[i], '#' + idContainerHtml + ' ' + cssArray[i]); 
			}
		}

 		for(var key in params) {
 			if(key != 'contains'){
 				var exp = new RegExp('{{' + key + '}}', "gmi");
 				cssContent = cssContent.replace(exp , params[key] );
 			}
 		}
			
		var s = document.createElement('style');
		s.setAttribute('type', 'text/css');
		s.innerHTML = cssContent;
		document.getElementsByTagName("head")[0].appendChild(s);
	 }

	/**
	 * @name loadjs
	 * @description Inicia la carga del js del módulo
	 * @return {void} 
	 */
	 function  loadjs(controller, params) {

	 	eval(controller);
		function getFuntion(selector) {
			
			var component = this.mainContainer.find(selector);
			component.context = this;
			return component;
		}

		function getContainer() {
			return this.mainContainer;
		}

		function service(service, callback, data) { 
			data.PATH = this.params.PATH;
			WebService.send(service, data ).done(this[callback].bind(this));
		}

		function serviceUpload(service, callback, data) { 
			data.PATH = this.params.PATH;
			WebService.sendFiles(service, data ).done(this[callback].bind(this));
		}
		
		if(!Titan.app[category]){
			Titan.app[category] = {};
		}

		var obj = Titan.modules[nameView.capitalize()];
		// var obj = JSON.parse(controller);
		// var obj = {};
		obj.mainContainer = container;
		obj.getContainer = getContainer;
		obj.get = getFuntion;
		obj.service = service;
		obj.serviceUpload = serviceUpload;

		obj.params = params;
		obj.params.PATH = category +'/'+nameView;
		
		if (nameView == 'crud') {
			Titan.app[category][nameView+'-'+this.params.id] = obj;
		}else{
			Titan.app[category][nameView] = obj;
		}

 		loadhtml(view, obj.params );	
		// obj.mainContainer.css('height', '100%').css('width', '100%');

		if ( 'ready' in obj) {
			obj.ready();
			if ( 'initEvents' in obj){
				obj.initEvents();	
			}else{
				console.log('No se resgistró metodo iniciador de eventos "initEvents" en el modulo');
			}
		} else {
			Titan.Message.error('No se resgistró un constructor "ready" en el modulo');
		}

	 }



	 /**
	 * @name view
	 * @description Inicializa los eventos que cargan el módulo
	 * @param {string} module, nombre del módulo
	 * @param {string} view, nombre de la vista a  cargar
	 * @param {JQuery Object} containerId, objeto sobre el cual se cargará el modulo
	 * @return {void} 
	 */

 	loadjs(controller, params);	
 	loadcss(style, params);

 	location.hash = category + '/' + nameView;
};