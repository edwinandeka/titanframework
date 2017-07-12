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
	host: '//'+location.host+ '/'+ APP_NAME +'/server.php',



	/**
	 * @name send
	 * @description Inicializa los eventos inicia reconstructMap que grafíca el mapa
	 * @param {String} webService , nombre del servicio web a consultar
	 * @param {object} params , data que se enviará al servidor ej: {id: 'EKA-1', username: 'edwin_eka'}
	 * @return {$Deferred}  
	 */
	 send: function  (route, params) {
	 	params.route = route;
	 	return this.post(params);
	 },

	 /**
	 * @name sendFiles
	 * @description para cargar archivos a un servicio en especifico
	 * @param {String} webService , nombre del servicio web a consultar
	 * @param {object} params , data que se enviará al servidor ej: {id: 'EKA-1', username: 'edwin_eka'}
	 * @return {$Deferred}  
	 */
	 sendFiles: function  (route, params) {
	 	params.route = route;
	 	return this.upload(params);
	 },


	/**
	 * @name post
	 * @description Inicializa los eventos inicia reconstructMap que grafíca el mapa
	 * @param {String} webService , nombre del servicio web a consultar
	 * @param {object} params , data que se enviará al servidor ej: {id: 'EKA-1', username: 'edwin_eka'}
	 * @return {$Deferred}  
	 */
	 post: function  (params) {
	 	params.TENANT = Titan.TENANT || 0;
	 	params.USER_ID = Titan.USER_ID || 0;

	 	if (Titan.token) {

			return 	$.ajax({
		 		url: this.host ,
		 		type: 'POST',
		 		beforeSend: function(request) {
				    request.setRequestHeader("token", Titan.token);
				    request.setRequestHeader("signature", Titan.signature);
				},
				success: function(data, textStatus, request){

		 			Titan.token = request.getResponseHeader('token');
		 			Titan.signature = request.getResponseHeader('signature');


			   	},
		 		dataType: 'json',
		 		data: params,
		 		
		 	}).always(function(data, status, request ){
		 		if (status == 'parsererror') {
		 			Titan.message.warning("Por favor contacte al Administrador", ('<pre>' + data.responseText+ '</pre>'));
		 			
		 		}else if (data.print_var) {
		 			Titan.message.warning("print_var",('<pre>' + data.print_var + '</pre>'));

		 		};
		 	});

	 	} else {

	 		return 	$.ajax({
		 		url: this.host ,
		 		type: 'POST',
		 		success: function(data, textStatus, request){

		 			Titan.token = request.getResponseHeader('token');
		 			Titan.signature = request.getResponseHeader('signature');


			   	},

		 		dataType: 'json',
		 		data: params,
		 		
		 	}).always(function(data, status, request ){

		 		if (status == 'parsererror') {
		 			Titan.message.warning("Por favor contacte al Administrador", ('<pre>' + data.responseText+ '</pre>'));
		 			
		 		}else if (data.print_var) {
		 			Titan.message.warning("print_var",('<pre>' + data.print_var + '</pre>'));

		 		};
		 	});
	 	}

	 	
	 },

	 /**
	 * @name upload
	 * @description carga archivos al servidor
	 * @param {object} params , data que se enviará al servidor ej: {id: 'EKA-1', username: 'edwin_eka'}
	 * @return {$Deferred}  
	 */
	 upload: function  ( params) {
	 	params.TENANT = Titan.TENANT || 0;
	 	params.USER_ID = Titan.USER_ID || 0;

	 	var formData = new FormData();                  

	    for (var i in params ) {
	    	var file = params[i];
	    	formData.append(i, file);
	    }
	

	 	if (Titan.token) {

			return 	$.ajax({
		 		url: this.host ,
		 		type: 'POST',
		 		beforeSend: function(request) {
				    request.setRequestHeader("token", Titan.token);
				    request.setRequestHeader("signature", Titan.signature);
				},
				success: function(data, textStatus, request){

		 			Titan.token = request.getResponseHeader('token');
		 			Titan.signature = request.getResponseHeader('signature');


			   	},
		 		dataType: 'json',
		 		data: formData,
		 		cache: false,
                contentType: false,
                processData: false,
		 		
		 	}).always(function(data, status, request ){
		 		if (status == 'parsererror') {
		 			Titan.message.warning("Por favor contacte al Administrador", ('<pre>' + data.responseText+ '</pre>'));
		 			
		 		}else if (data.print_var) {
		 			Titan.message.warning("print_var",('<pre>' + data.print_var + '</pre>'));

		 		};
		 	});

	 	} else {

	 		return 	$.ajax({
		 		url: this.host ,
		 		type: 'POST',
		 		success: function(data, textStatus, request){

		 			Titan.token = request.getResponseHeader('token');
		 			Titan.signature = request.getResponseHeader('signature');


			   	},

		 		dataType: 'json',
		 		data: formData,
		 		cache: false,
                contentType: false,
                processData: false,
		 		
		 	}).always(function(data, status, request ){

		 		if (status == 'parsererror') {
		 			Titan.message.warning("Por favor contacte al Administrador", ('<pre>' + data.responseText+ '</pre>'));
		 			
		 		}else if (data.print_var) {
		 			Titan.message.warning("print_var",('<pre>' + data.print_var + '</pre>'));

		 		};
		 	});
	 	}

	 	
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

	 cmd: function  (params) {
	 	return 	$.ajax({
	 		url: this.host ,
	 		type: 'POST',
	 		dataType: 'text',
	 		data: params,
	 	});
	 },
	};