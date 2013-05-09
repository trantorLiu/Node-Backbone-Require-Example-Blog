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
      'click #delete': 'delete'
    },
    delete: function(e) {
      var that = this;
      e.preventDefault();
      this.model.destroy({
        sync: true,
        success: function(model) {
          that.trigger('success');
        },
        error: function() {
          that.trigger('router:alert');
        }
      });
    }
  });

  return PostShowView;
});
