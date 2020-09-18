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
  likes: Number,
  posts: [PostSchema], //#subdocument!
  blogPosts: [{ type: Schema.Types.ObjectId, ref: 'blogPost' }],
});

UserSchema.virtual('postCount').get(function () {
  return this.posts.length;
});

module.exports = UserSchema;

//#VALIDATION
/**
 * we can perform validation in different ways.
 * When we define a property, instead of specifying only the type we could pass an object, where explicitly declare the type and some other properties that could be used by mongo as validation. For example the 'required' flag.
 *
 * as an alternative, we can use a 'validator' property to set a custom function and a message to be displayed in case of validation failure. The function receives the model property as its first argument, then we can operate with it.
 */

//# Virtual Types
/**
 * Virtual types are some props that we would like to access on a model without actually persisting them into the database. As an example, a postCount property on a user is not strictly necessary on the db.
 *
 * we can attach a virtual type to a model by using the virtual() function. It accepts a string which defines the
 * name of the virtual property we want to create.
 *
 *In order to define what a virtual type should return, we chain a getter to the virtual() function. The getter has a function as a first argument.
 *! it must be a regular function, not arrow
 * because we need to refer to the 'this' keyword, to read inside the instance of the model.
 *
 * Once we do that, or virtual type can be treated as a property, so we can read its value without calling a function (i.e. not user.postCount() but user.postCount). As soon as we attempt to read the property, the function provided in the getter is triggered
 *
 * |UserSchema.virtual('postCount').get(function () {
 * |  return this.posts.length;
 * | });
 */

//# Associations with refs
/**
 * when we want to create some relationship in a SQL fashion we can use the refs. This allows to relate different models (different collections) as opposed to the subdocuments relationships where the schema is inside the same model.
 *
 * to do so, we need to pass an object (or an array of object) with the type property of 'Schema.Types.ObjectId' and a ref which represent the name of the model we want to connect to.
 *
 * | blogPosts: [{ type: Schema.Types.ObjectId, ref: 'comment' }],
 */
