define('PostModel', [
       'jquery',
       'underscore',
       'backbone'
], function ($, _, backbone) {
  var Post;

  Post = backbone.Model.extend({
    idAttribute: '_id',
    urlRoot: '/api/v1/post',
    defaults: {
    }
    , validate: function (attrs) {
    }
  });

  return Post;
});
