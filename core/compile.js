Compiler = function (html, params) {
	
	var constants =  html.match(/\[[\w]+\]/gmi);

	if(constants)
		for (var i = 0; i < constants.length; i++) {
			var constant = constants[i].replace('[', '').replace(']', '');
			html  = html.replace(constants[i], (params[constant] || '') ); 
		}

	return html;

	
}