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
      'click #post-add-submit': 'addPost',
      'click #post-add-back': 'back'
    },
    addPost: function(e) {
      var title, author, body, that;

      e.preventDefault();

      that = this;
      title = $.trim($('#post-add-title').val());
      author = $.trim($('#post-add-author').val());
      body = $.trim($('#post-add-body').val());

      this.model.save({
        title   : title,
        author  : author,
        body    : body
      }, {
        silent  : false,
        sync    : true,
        success : function(model, res) {
          if (res && res.error) {
            // TODO
          } else {
            model.trigger('add-success', model.get('_id'));
          }
        },
        error: function(model, res) {
          // TODO
        }
      });
    },
    back: function(e) {
      e.preventDefault();
      this.trigger('back');
    }
  });

  return PostAddView;
});
