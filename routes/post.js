var PostModel = require('../models/post'),
    _ = require('underscore'),
    api = require('../config').API;
var postRoute = function(app) {
  app.get(api + '/post/list', function(req, res, next) {
    PostModel.find({})
    .exec(function(err, posts) {
      if (err) return next(err);
      res.json(posts);
    });
  });

  app.get(api + '/post/:id', function(req, res, next) {
    PostModel.findById(req.params.id, function(err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });

  app.post(api + '/post', function(req, res, next) {
    var newPost = new PostModel({
      title: req.body.title,
      body: req.body.body,
      author: req.body.author
    });
    newPost.save(function(err) {
      if (err) return next(err);
      res.json(newPost);
    });
  });

  app.put(api + '/post/:id', function(req, res, next) {
    PostModel.findById(req.params.id, function(err, post) {
      if (err) return next(err);
      newAttrs = _.pick(req.body, ['title', 'body']);
      post = _.extend(post, newAttrs);
      post.save(function(err) {
        if (err) return next(err);
        res.send(post);
      });
    });
  });

  app.del(api + '/post/:id', function(req, res, next) {
    PostModel.findById(req.params.id, function(err, post) {
      if (err) return next(err);
      post.remove();
      res.json({});
    });
  });

};

module.exports = postRoute;
