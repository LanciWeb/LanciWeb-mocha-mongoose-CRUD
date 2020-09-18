const mongoose = require('mongoose');
const { Schema } = mongoose;

const BlogPostSchema = new Schema({
  title: String,
  content: String,
  comments: [{ type: Schema.Types.ObjectId, ref: 'comment' }],
});

module.exports = BlogPostSchema;
