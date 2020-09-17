const assert = require('assert');
const User = require('../src/models/user');

describe('virtual types', () => {
  it('postCount always return the number of posts', (done) => {
    const joe = new User({ name: 'Joe', posts: [{ title: 'one post' }] });
    joe
      .save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.postCount === 1);
        done();
      });
  });
});

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
