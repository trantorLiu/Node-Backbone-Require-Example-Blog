define('HomeView', [
       'jquery',
       'underscore',
       'backbone',
       'text!templates/home.html'
], function($, _, backbone, tpl) {
  var HomeView;

  HomeView = backbone.View.extend({
    initialize: function() {
      this.compiled = _.template(tpl);
    },
    render: function() {
      this.$el.html(this.compiled());
      return this;
    }
  });
  return HomeView;
});
