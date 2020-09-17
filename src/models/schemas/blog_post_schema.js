3;
const mongoose = require('mongoose');
const { Schema } = mongoose;

const BlogPostSchema = new Schema({ title: String, content: String });

module.exports(BlogPostSchema);
