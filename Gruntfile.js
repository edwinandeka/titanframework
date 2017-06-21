var arrClases = [
'js/sweetalert.js', 

'core/global.js', 
'core/module.js', 
'core/lang.js', 
'core/event.js', 
'core/util.js', 
'core/view.js', 
'core/webservice.js', 
'core/message.js', 
'core/popup.js', 
'core/validate.js', 
];

var arrClasesCss = [
'css/sweetalert.css', 
'css/popup.css', 
];


module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        conf: grunt.file.readJSON('package.json'),
        
        concat: {
            options: {
                separator: '\n/*=======================================================================================*/\n',
                banner: '/**\n'+
                ' *\n'+
                ' * @class Titan Framework\n'+
                ' * @author edwinandeka@gmail.com.com (Edwin Ramiro Ospina Ruiz )\n'+
                ' * @date  <%= grunt.template.today("yyyy-mm-dd HH:MM:s") %>\n'+
                ' * @version <%= conf.name %>\n'+
                ' *\n'+
                ' * @license Derechos Reservados de Autor (C) DOWESOFT (dowesoft.com)\n'+
                ' */\n',
            },

            dist: {
                src: arrClases,
                dest: 'dist/<%= conf.name %>-<%= conf.version %>.js',
            },

            deploy: {
                src: arrClases,
                dest: 'dist/js/<%= conf.name %>-<%= conf.version %>.js',
            },

            core: {
                src: arrClases,
                dest: '../sercodex/js/<%= conf.name %>-<%= conf.version %>.js',
            },

            css: {
                src: arrClasesCss,
                dest: '../sercodex/css/<%= conf.name %>-<%= conf.version %>.css',
            },



            all: {
                src: [
                '../sercodex/js/<%= conf.name %>-<%= conf.version %>.core.js', 
                '../sercodex/js/<%= conf.name %>-<%= conf.version %>.html.js', 
                ],
                dest: '../sercodex/js/<%= conf.name %>-<%= conf.version %>.js',
            },
        },
        
        jslint: { // configure the task 

            // lint your project's client code 
            client: {

                src: [
                'dist/<%= conf.name %>-<%= conf.version %>.js'
                ],
                
                directives: {
                    browser: true,
                    predef: [
                    'jQuery'
                    ]
                },
                
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
   // grunt.loadNpmTasks('grunt-contrib-uglify');

   grunt.loadNpmTasks('grunt-contrib-concat');
   grunt.loadNpmTasks('grunt-jslint'); // load the task 

    // Default task(s).
    // grunt.registerTask('default', ['concat:core']);
    grunt.registerTask('default', ['concat:core','concat:css']);
    grunt.registerTask('lint', ['jslint:client']);

};