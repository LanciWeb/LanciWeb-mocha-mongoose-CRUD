const mongoose = require('mongoose');
const BlogPostSchema = require('./schemas/blog_post_schema');

const BlogPost = mongoose.model('blogPost', BlogPostSchema);
