requirejs.config({
	shim: {
		'underscore': {
			exports: '_'
		}
		, backbone: {
			deps: ['underscore', 'jquery']
			, exports: 'backbone'
		}
	}
	/**
	 * HACK:
	 * Modified Underscore and Backbone to be AMD compatible (define themselves)
	 * since it didn't work properly with the RequireJS shim when optimizing
	 */
	, paths: {
		app						: 'app'
		, router			: 'router'
		, text				: 'lib/text'
		, jquery			: 'lib/jquery'
		, underscore	:	'lib/underscore-amd'
		, backbone		: 'lib/backbone-amd'
		, HeaderView	: 'views/header'
		, HomeView		: 'views/home'
	}
});

require(['app'], function (app) {
	app.initialize();
});
