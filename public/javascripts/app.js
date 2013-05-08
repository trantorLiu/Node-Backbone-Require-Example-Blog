define('app', [
  'jquery',
  'underscore',
  'backbone',
  'router'
], function($, _, backbone, router) {

  // extend router with appView()
  _.extend(router.prototype, {
    appView: {
      show: function (view, callback) {
        if (this.currentView) {
          this.currentView.close();
        }

        this.currentView = view;
        this.currentView.render(callback);

        $("#page-content").hide().html(this.currentView.el).fadeIn();

      }
    }
  });
  _.extend(backbone.View.prototype, {
    close: function() {
      this.remove();
      this.unbind();
      if (this.onClose) {
        this.onClose();
      }
    }
  });

  var initialize = function() {
    var app = new router();
    backbone.history.start();
  }

  return {
    initialize: initialize
  };
});
