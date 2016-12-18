module.exports = function(config){
	config.set({
		singleRun : true,
	    basePath : '',
	    files : [
	    	'app/bower_components/angular/angular.min.js',
	    	'app/bower_components/angular-route/angular-route.min.js',
	    	'app/bower_components/angular-mocks/angular-mocks.js',
	    	'app/app.js',
	    	'app/Modules/*.js',
	    	'app/Components/*.js',
	    	'app/Test/*.js',
	    	'node_modules/phantomjs-polyfill/bind-polyfill.js'
	    ],
	    autoWatch : true,
	    frameworks:['jasmine'],
	    plugins:[
	    	'karma-jasmine',
	    	'karma-phantomjs-launcher',
	    	'karma-htmlfile-reporter'
	    ],
	    browsers :['PhantomJS'],
	    reporters:['html'],
	    htmlReporter:{
	    	outputFile: 'Test/results.html'
	    }
	});
};