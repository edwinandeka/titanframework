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
	var partial;


 	if (category.contains('/')) {
		partial = nameView;
		category = category.split('/');
		nameView = category.pop();
		category = category.pop();
	}

	var idContainerHtml;
	if (partial) {
 		idContainerHtml = category + '-' + nameView + '-' + partial + '-app-container';
	} else {
 		idContainerHtml = category + '-' + nameView + '-app-container';
	}


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


 		/**
 		 * 
 		 * ejecutar codigo javascript desde el html
 		var expCode = /{&(.(?!\&)||\s)+.&}/gmi;


 		var codes = data.match(expCode);
 				debugger

 		for(var key in codes) {
 			if(key != 'contains'){

 				data = data.replace(exp , eval(codes[key].substring(2, codes[key].length -2 )) );
 			}
 		}**/


		content.append(data);
		content.css('height', '100%').css('width', '100%');
		container.html(content);
		container = content;

		/* buscamos y cargamos partials desde el html 
		var REGEX_PARTIALS = /<partial(.(?!\/))+.\s?\/>/gmi;
 		var partials = data.match(REGEX_PARTIALS);
 		var partial;
 		
 		for(var key in partials) {
 			if(key != 'contains'){
 				partial = partials[key];

 				data = data.replace(exp , eval(partials[key].substring(2, partials[key].length -2 )) );
 			}
 		}*/
		
 		
	 }


	/**
	 * @name loadcss
	 * @description Inicia la carga del css del módulo
	 * @return {void} 
	 */
	  function  loadcss(cssContent, params) {

	  	/* remover los comentarios */
	  	var REGEX_COMMENTS = /\/\*((.|\s)(?!\*\/))+\s+?\*\//gmi;
 		cssContent = cssContent.replace(REGEX_COMMENTS , '' );
	

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
		s = $(s);
		s.attr({
			type: 'text/css',
			'data-view': category +'-'+nameView
		});
		$("head").append(s);
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

		function partialFun(name, container, params) { 
			Titan.loadPartial(name, container, this.params.PATH, params);
		}

		
		
		if(!Titan.app[category]){
			Titan.app[category] = {};
		}

		var obj;
		if (partial) {
			obj = Titan.modules[partial.capitalize()];
		} else {
			obj = Titan.modules[nameView.capitalize()];
		}
		obj.mainContainer = container;
		obj.getContainer = getContainer;
		obj.get = getFuntion;
		obj.service = service;
		obj.loadPartial = partialFun;
		obj.partials = {};
		obj.serviceUpload = serviceUpload;

		obj.params = params;
		
		/* se registra la app o el partial */
		if (partial) {
			obj.params.PATH = category +'/'+nameView +'/partials/'+ partial;
			Titan.app[category][nameView].partials[partial] = obj;
			Titan.app[category][nameView].partials[partial].appParent = Titan.app[category][nameView];
		} else {
			obj.params.PATH = category +'/'+nameView;
			Titan.app[category][nameView] = obj;
		}

		/* se renderiza el html */
 		loadhtml(view, obj.params );	

		/* se inicializan los eventos */
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