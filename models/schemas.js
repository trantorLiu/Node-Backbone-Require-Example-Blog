var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    PostSchema;

PostSchema = new Schema({
  title: String,
  author: String,
  body: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports.PostSchema = PostSchema;
