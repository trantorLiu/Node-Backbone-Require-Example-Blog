define('PostListView', [
       'jquery',
       'underscore',
       'backbone',
       'PostCollection',
       'text!templates/post/list.html'
], function($, _, backbone, PostCollection, tpl) {
  var PostAddView;

  PostAddView = backbone.View.extend({
    id: 'post-list-view',
    initialize: function(options) {
      this.collection = options.collection;
      this.compiled = _.template(tpl);
    },
    render: function() {
      html = this.compiled({
        posts: this.collection.toJSON()
      });
      this.$el.html(html);

      return this;
    }
  });

  return PostAddView;
});
