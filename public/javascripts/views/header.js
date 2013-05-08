define('HeaderView', [
       'jquery'
        , 'underscore'
        , 'backbone'
        , 'text!templates/header.html'
], function($, _, backbone, tpl) {
  var HeaderView;

  HeaderView = backbone.View.extend({
    id: 'header-view',
    initialize: function() {
      var ajaxLoader;

      this.compiled = _.template(tpl);

      $('body').ajaxStart(function() {
        ajaxLoader = ajaxLoader || $('#ajax-loader');
        ajaxLoader.show();
      }).ajaxStop(function() {
        ajaxLoader.fadeOut('fast');
      });
    },
    render: function() {
      this.$el.html(this.compiled());
      return this;
    }
  });

  return HeaderView;
});
