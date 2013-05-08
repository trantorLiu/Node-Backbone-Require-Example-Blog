define('PostShowView', [
       'jquery',
       'underscore',
       'backbone',
       'text!templates/post/show.html'
], function($, _, backbone, tpl) {
  var PostShowView;

  PostShowView = backbone.View.extend({
    id: 'post-show-view',
    initialize: function() {
      this.html = _.template(tpl, {
        post: this.model.toJSON()
      });
    },
    render: function() {
      this.$el.html(this.html);
      return this;
    },
    events: {
      'click .post-show-delete': 'deletePost'
    },
    deletePost: function(e) {
      e.preventDefault();
      this.model.destroy({
        sync: true,
        success: function(model) {
          model.trigger('delete-success');
        },
        error: function() {
          // TODO handle 404 and 500
        }
      });
    }
  });

  return PostShowView;
});
