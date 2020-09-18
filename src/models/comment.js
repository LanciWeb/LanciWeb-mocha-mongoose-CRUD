const mongoose = require('mongoose');
const CommentSchema = require('./schemas/comment_schema');

const BlogPost = mongoose.model('comment', CommentSchema);

module.exports = BlogPost;
