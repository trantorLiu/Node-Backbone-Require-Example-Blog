define('PostCollection', [
  'jquery',
  'underscore',
  'backbone',
  'PostModel'
], function ($, _, backbone, PostModel) {
  var PostClooection;

  PostCollection = backbone.Collection.extend({
    model: PostModel,
    url: '/api/v1/post/list'
  });

  return PostCollection;
});
