define('PostListView', [
	'jquery'
	, 'underscore'
	, 'backbone'
	, 'PostCollection'
	, 'text!templates/post/list.html'
], function ($, _, backbone, PostCollection, tpl) {
	var PostAddView;

	PostAddView = backbone.View.extend({
		id: 'post-add-view'
		, initialize: function () {
			var postList;
			this.collection = new PostCollection();
			this.compiled = _.template(tpl);
		}
		, fetchCollection: function (callback) {
			this.collection.fetch({
				success: function (collection) {
					callback(collection);
				}, error: function (collection, res) {
					if (res.status === 404) {
						// TODO handle 404 Not Found
					} else if (res.status === 500) {
							// TODO handel 500 Internal Server Error
					}
				}
			});
		}
		, render: function (callback) {
			var that = this;
			this.fetchCollection(function (collection) {
				html = that.compiled({
					posts: collection.toJSON()
				});
				that.$el.html(html);

				callback();
			});

			return this;
		}
	});

	return PostAddView;
});
