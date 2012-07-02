var PostModel = require('../models/post')
	, _ = require('underscore')
	, api = require('../config').API;
var postRoute = function (app) {
	app.get(api + '/post/list', function (req, res) {
		PostModel.find({})
			.exec(function (err, posts) {
				if (err) throw err;
				res.json(posts);
			});
	});

	app.get(api + '/post/:id', function (req, res) {
		PostModel.findById(req.params.id, function (err, post) {
			if (err) throw err;
			res.json(post);
		});
	});

	app.post(api + '/post', function (req, res) {
		var newPost = new PostModel({
			title: req.body.title
			, body: req.body.body
			, author: req.body.author
		});
		newPost.save(function (err) {
			if (err) throw err;
			res.json(newPost);
		});
	});

	app.put(api + '/post/:id', function (req, res) {
		PostModel.findById(req.params.id, function (err, post) {
			if (err) throw err;
			newAttrs = _.pick(req.body, ['title', 'body']);
			post = _.extend(post, newAttrs);
			post.save(function (err) {
				if (err) throw err;
				res.send();	// send 204 No Content
			});
		});
	});

	app.del(api + '/post/:id', function (req, res) {
		PostModel.findById(req.params.id, function (err, post) {
			if (err) throw err;
			post.remove();
			res.json({});
		});
	});

};

module.exports = postRoute;
