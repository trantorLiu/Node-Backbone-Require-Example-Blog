define('router', [
	'jquery'
	, 'underscore'
	, 'backbone'
	, 'HomeView'
	, 'HeaderView'
	//, 'PostListView'
	//, 'PostView'
	//, 'PostEditView'
	//, 'PostModel'
//], function ($, _, backbone, HomeView, HeaderView, PostListView, PostView, PostEditView, Post) {
], function ($, _, backbone, HomeView, HeaderView) {
	var router;

	router = backbone.Router.extend({
		routes: {
			''						: 'home'
			, 'home'			: 'home'
			, 'posts'			: 'showPosts'
			, 'posts/new'	: 'addPost'
			, 'posts/:id'	: 'showPost'
			, 'posts/:id/edit' : 'editPost'
			, '*action'		: 'defaultAction'
		}
		, initialize: function () {
			this.postView = {};
			this.postEditView = {};
			this.headerView = new HeaderView();

			// cached elements
			this.elms = {
				'page-content': $('.page-content')
			};
			$('header').hide().html(this.headerView.render().el).fadeIn('slow');
			$('footer').fadeIn('slow');
		}
		, home: function () {
			//this.headerView.select('home-menu');

			if (!this.homeView) {
				this.homeView = new HomeView();
			}
			this.elms['page-content'].html(this.homeView.render().el);
		}
	});

	return router;
});
