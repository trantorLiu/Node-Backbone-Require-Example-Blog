define('PostModel', [
	'jquery'
	, 'underscore'
	, 'backbone'
], function ($, _, backbone) {
	var Post;

	Post = backbone.Model.extend({
		idAttribute: '_id'
		, urlRoot: '/api/v1/post'
		, defaults: {
			title: ''
			, author: ''
			, body: ''
			, date: new Date()
		}
		, validate: function (attrs) {
		}
	});

	return Post;
});
