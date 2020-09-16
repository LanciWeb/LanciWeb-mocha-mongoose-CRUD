const assert = require('assert');
const User = require('../src/user');

describe('Deleting users', () => {
  // We are manually adding this user here because in the main mocha file (test_helper) we are running a
  let joe;
  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    joe.save().then(() => done());
  });

  it('model instance remove', (done) => {
    joe
      .remove()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('model class remove', (done) => {
    User.remove({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('model class findOneAndRemove', (done) => {
    User.findOneAndRemove()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('model class findByIdAndRemove', (done) => {
    User.findByIdAndRemove(joe._id)
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
});

//# model instance remove()
//used on an instance, removes that specific instance.

//# model class remove()
// removes all the elements in the collection that meet

//# model class findOneAndRemove()
// removes the first element that meets the provided criteria

//# model class findByIdAndRemove()
// we can find the instance to be deleted by passing the ObjectId
