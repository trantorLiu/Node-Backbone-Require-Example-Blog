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
    routes            : {
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

      // cached elements
      this.elms = {
        'page-content': $('.page-content')
      };
      $('header').hide().html(this.headerView.render().el).fadeIn('slow');
      $('footer').fadeIn('slow');
    },
    home: function() {
      //this.headerView.select('home-menu');

      if (!this.homeView) {
        this.homeView = new HomeView();
      }
      this.elms['page-content'].html(this.homeView.render().el);
    },
    showPostList: function() {
      var that = this;

      if (!this.postListView) {
        this.postListView = new PostListView();
      }
      this.postListView.render(function() {
        that.elms['page-content'].html(that.postListView.el);
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
          view = new PostShowView({ model: model });
          that.elms['page-content'].html(view.render().el);

          view.model.on('delete-success', function() {
            delete view;
            that.navigate('#/post/list', { trigger: true });
          });
        },
        error: function(model, res) {
          // TODO
        }
      });
    },
    addPost: function() {
      var that = this, view;

      view = new PostAddView({
        model: new Post()
      });

      this.elms['page-content'].html(view.render().el);
      view.on('back', function() {
        delete view;
        that.navigate('#/post/list', { trigger: true });
      });
      view.model.on('add-success', function(id) {
        delete view;
        that.navigate('#/post/' + id, { trigger: true });
      });
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
          view = new PostEditView({ model: model });
          that.elms['page-content'].html(view.render().el);

          view.on('back', function() {
            delete view;
            that.navigate('#/post/' + id, { trigger: true });
          });
          view.model.on('save-success', function() {
            delete view;
            that.navigate('#/post/' + id, { trigger: true });
          });
        },
        error: function(model, res) {
          // TODO
        }
      });
    }
  });

  return router;
});
