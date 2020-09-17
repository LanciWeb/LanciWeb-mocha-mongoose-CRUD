const assert = require('assert');
const User = require('../src/models/user');

describe('updating users', () => {
  let joe;
  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    joe.save().then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Mark');
        done();
      });
  }

  it('model instance set and update', (done) => {
    joe.set('name', 'Mark');
    assertName(joe.save(), done);
  });

  it('model instance update', (done) => {
    assertName(joe.update({ name: 'Mark' }), done);
  });

  it('model class update', (done) => {
    assertName(User.update({ name: 'Joe' }, { name: 'Mark' }), done);
  });
  it('model class findOneAndUpdate', (done) => {
    assertName(User.findOneAndUpdate({ name: 'Joe' }, { name: 'Mark' }), done);
  });
  it('model class findByIdAndUpdate', (done) => {
    assertName(User.findByIdAndUpdate(joe._id, { name: 'Mark' }), done);
  });

  it('increment a value by one on each instance of a model', (done) => {
    User.update({ name: 'Joe' }, { $inc: { likes: 1 } })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.likes === 1);
        done();
      });
  });
});

//# model instance 'set' and 'save'
/**
 * is useful when we want to update a set of properties inside a model, maybe do some other stuff or checks in the middle and then save everything at the end
 */

//# model instance update
/**
 * with update, we can update a set of properties in the model, so we can pass he updated properties but we don't need to call save(). This means that we are directly persisting out changes in the database
 */

//# model class update
/**
 * This updates all the instances of the collection that meet the criteria passed in the first argument. We need to pass a second argument to specify what properties we want to update. No need to save();
 */
//# model class findOneAndUpdate
/**
 * This updates the first instance of the collection that meets the criteria passed in as a first argument.We need to pass a second argument to specify what properties we want to update. No need to save();
 */
//# model class findByIdAndUpdate
/**
 * This updates the instance whose _id matches the id provided as first argument.We need to pass a second argument to specify what properties we want to update. No need to save();
 */

//#update operators
/**
 * when we work with model classes, we can perform some operations directly on the database, giving Mongo some instructions that it will execute directly, thanks to the Update Operators.
 * This is cool because we don't have to make several fetches and calls to our database.
 * |https://docs.mongodb.com/manual/reference/operator/update/
 */

//# INCREMENT ($inc)
/**
 * can be used to increment values on the database when used with one of the update functions. It can be used to decrement by providing negative values
 */
