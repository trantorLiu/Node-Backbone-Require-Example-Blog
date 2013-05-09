define('router', [
       'jquery',
       'underscore',
       'backbone',
       'PostModel',
       'HomeView',
       'HeaderView',
       'PostAddView',
       'PostShowView',
       'PostListView',
       'PostEditView'
], function($, _, backbone, Post, HomeView, HeaderView, PostAddView, PostShowView, PostListView, PostEditView) {
  var router;

  router = backbone.Router.extend({
    routes: {
      ''              : 'home',
      'home'          : 'home',
      'post/list'     : 'showPostList',
      'post/new'      : 'addPost',
      'post/:id'      : 'showPost',
      'post/:id/edit' : 'editPost',
      '*action'       : 'defaultAction',
    },
    initialize: function() {
      this.postListView;
      this.postAddView;
      this.headerView = new HeaderView();

      $('header').hide().html(this.headerView.render().el).fadeIn('slow');
      $('footer').fadeIn('slow');
    },
    home: function() {
      //this.headerView.select('home-menu');

      if (!this.homeView) {
        this.homeView = new HomeView();
      }
      this.appView.show(this.homeView);
    },
    showPostList: function() {
      var that, view, collection;

      that = this;
      collection = new PostCollection;

      collection.fetch({
        success: function(collection, res) {
          view = new PostListView({collection: collection});
          that.appView.show(view);
        },
        error: that.alert
      });

    },
    showPost: function(id) {
      var that, view, model;
      that = this;

      // set silent to bypass the validation for fetching
      model = new Post({
        _id: id,
        silent: true
      });
      model.fetch({
        success: function(model, res) {
          view = new PostShowView({model: model});
          that.appView.show(view);

          view.on('success', function() {
            delete view;
            that.navigate('#/post/list', {trigger: true});
          });
          view.on('router:alert', that.alert);
        },
        error: that.alert
      });
    },
    addPost: function() {
      var that = this, view;

      view = new PostAddView({
        model: new Post()
      });

      this.appView.show(view);
      view.on('success', function(id) {
        delete view;
        that.navigate('#/post/' + id, {trigger: true});
      });
      view.on('router:alert', that.alert);
    },
    editPost: function(id) {
      var that, view, post;

      that = this;

      post = new Post({
        _id: id,
        silent: true
      });
      post.fetch({
        success: function(model, res) {
          view = new PostEditView({model: model});
          that.appView.show(view);

          view.on('success', function() {
            delete view;
            that.navigate('#/post/' + id, {trigger: true});
          });
          view.on('router:alert', that.alert);
        },
        error: that.alert
      });
    },
    alert: function() {
      alert('Error occurred');
    }
  });

  return router;
});
