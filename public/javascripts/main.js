requirejs.config({
  shim: {
    'underscore': {
      exports: '_'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'backbone'
    }
  },
  /**
   * HACK:
   * Modified Underscore and Backbone to be AMD compatible (define themselves)
   * since it didn't work properly with the RequireJS shim when optimizing
   */
  paths            : {
    app            : 'app',
    router         : 'router',
    text           : 'lib/text',
    jquery         : 'lib/jquery',
    underscore     : 'lib/underscore-amd',
    backbone       : 'lib/backbone-amd',
    PostModel      : 'models/post',
    PostCollection : 'collections/post',
    HeaderView     : 'views/header',
    HomeView       : 'views/home',
    PostAddView    : 'views/post/add',
    PostShowView   : 'views/post/show',
    PostListView   : 'views/post/list',
    PostEditView   : 'views/post/edit'
  }
});

require(['app'], function (app) {
  app.initialize();
});
