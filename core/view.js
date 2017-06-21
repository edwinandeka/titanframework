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

		 	if(containerId instanceof $){
		 		this.container = containerId;
		 	} else {

			 	if (typeof(containerId) == 'undefined') 
			 		this.container = $('#render');
			 	else
			 		this.container = $('#'+containerId);
			 }
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