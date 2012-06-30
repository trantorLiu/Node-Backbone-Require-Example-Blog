define('HomeView', [
	'jquery'
	, 'underscore'
	, 'backbone'
	, 'text!templates/home.html'
], function ($, _, backbone, tpl) {
	var HomeView;

	HomeView = backbone.View.extend({
		initialize: function () {
			this.template = _.template(tpl);
		}
		, render: function () {
			this.$el.html(this.template());
			return this;
		}
	});
	return HomeView;
});
