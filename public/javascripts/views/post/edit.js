define('PostEditView', [
	'jquery'
	, 'underscore'
	, 'backbone'
	, 'text!templates/post/edit.html'
], function ($, _, backbone, tpl) {
	var PostEditView;

	PostEditView = backbone.View.extend({
		id: 'post-edit-view'
		, initialize: function () {
			this.compiled = _.template(tpl);
		}
		, render: function () {
			var html;
			html = this.compiled({
				post: this.model.toJSON()
			});
			this.$el.html(html);
			return this;
		}
		, events: {
			'click #post-edit-save': 'savePost'
			, 'click #post-edit-back': 'back'
		}
		, savePost: function (e) {
			var title, author, body, that;

			e.preventDefault();

			that = this;
			title = $.trim($('#post-edit-title').val());
			body = $.trim($('#post-edit-body').val());

			this.model.save({
				title			: title
				, author	: author
				, body		: body
			}, {
				silent		: false
				, sync		: true
				, success	: function (model, res) {
					if (res && res.error) {
						// TODO
					} else {
						model.trigger('save-success', model.get('_id'));
					}
				}
				, error: function (model, res) {
					// TODO
				}
			});
		}
		, back: function (e) {
			e.preventDefault();
			this.trigger('back');
		}
	});

	return PostEditView;
});
