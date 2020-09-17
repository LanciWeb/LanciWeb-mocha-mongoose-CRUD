const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./post_schema');

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required.'],
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters',
    },
  },
  postCount: Number,
  posts: [PostSchema], //#subdocument!
});

module.exports = UserSchema;

//#VALIDATION
/**
 * we can perform validation in different ways.
 * When we define a property, instead of specifying only the type we could pass an object, where explicitly declare the type and some other properties that could be used by mongo as validation. For example the 'required' flag.
 *
 * as an alternative, we can use a 'validator' property to set a custom function and a message to be displayed in case of validation failure. The function receives the model property as its first argument, then we can operate with it.
 */
