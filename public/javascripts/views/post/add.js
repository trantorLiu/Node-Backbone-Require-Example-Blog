define('PostAddView', [
       'jquery',
       'underscore',
       'backbone',
       'text!templates/post/add.html'
], function($, _, backbone, tpl) {
  var PostAddView;

  PostAddView = backbone.View.extend({
    id: 'post-add-view',
    initialize: function() {
      this.compiled = _.template(tpl);
    },
    render: function() {
      this.$el.html(this.compiled());
      return this;
    },
    events: {
      'click #submit': 'submit'
    },
    submit: function(e) {
      var title, author, body, that;

      e.preventDefault();

      that = this;
      title = $.trim(this.$el.find('#title').val());
      author = $.trim(this.$el.find('#author').val());
      body = $.trim(this.$el.find('#body').val());

      this.model.save({
        title   : title,
        author  : author,
        body    : body
      }, {
        success: function(model, res) {
          that.trigger('success', model.id);
        },
        error: function(model, res) {
          that.trigger('router:alert');
        }
      });
    },
  });

  return PostAddView;
});
