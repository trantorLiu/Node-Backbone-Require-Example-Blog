define('PostEditView', [
       'jquery',
       'underscore',
       'backbone',
       'text!templates/post/edit.html'
], function($, _, backbone, tpl) {
  var PostEditView;

  PostEditView = backbone.View.extend({
    id: 'post-edit-view',
    initialize: function() {
      this.compiled = _.template(tpl);
    },
    render: function() {
      var html;
      html = this.compiled({
        post: this.model.toJSON()
      });
      this.$el.html(html);
      return this;
    },
    events: {
      'click #save': 'savePost'
    },
    savePost: function(e) {
      var title, author, body, that;

      e.preventDefault();

      that = this;
      title = $.trim(this.$el.find('#title').val());
      body = $.trim(this.$el.find('#body').val());

      this.model.save({
        title   : title,
        author  : author,
        body    : body
      }, {
        silent  : false,
        sync    : true,
        success : function(model, res) {
          that.trigger('success', model.id);
        },
        error: function(model, res) {
          that.trigger('router:alert');
        }
      });
    },
  });

  return PostEditView;
});
