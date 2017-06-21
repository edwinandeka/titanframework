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