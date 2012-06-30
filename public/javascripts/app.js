define('app', [
	'jquery'
	, 'underscore'
	, 'backbone'
	, 'router'
], function ($, _, backbone, router) {
	var initialize = function () {
		var app = new router();
		backbone.history.start();
	}
	
	// TODO: error handling with window.onerror
	// http://www.slideshare.net/nzakas/enterprise-javascript-error-handling-presentation

	return {
		initialize: initialize
	};
});
