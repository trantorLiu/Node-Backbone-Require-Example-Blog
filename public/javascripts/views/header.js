define('HeaderView', [
	'jquery'
	, 'underscore'
	, 'backbone'
	, 'text!templates/header.html'
], function ($, _, backbone, tpl) {
	var HeaderView;

	HeaderView = backbone.View.extend({
		initialize: function () {
			var ajaxLoader;

			this.template = _.template(tpl);

			$('body').ajaxStart(function () {
				ajaxLoader = ajaxLoader || $('#ajax-loader');
				ajaxLoader.show();
			}).ajaxStop(function () {
				ajaxLoader.fadeOut('fast');
			});
		}
		, render: function () {
			this.$el.html(this.template());
			return this;
		}
	});

	return HeaderView;
});
