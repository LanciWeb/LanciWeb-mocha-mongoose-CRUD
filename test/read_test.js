const assert = require('assert');
const User = require('../src/models/user');

describe('Reading users', () => {
  // We are manually adding this user here because in the main mocha file (test_helper) we are running a
  let joe;
  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    joe.save().then(() => done());
  });
  it('read all users', (done) => {
    User.find({ name: 'Joe' }).then((users) => {
      console.log(users);
      assert(users[0]._id.toString() === joe._id.toString());
      done();
    });
  });
  it('read specific user', (done) => {
    User.findOne({ _id: joe._id }).then((user) => {
      console.log(user);
      assert(user.name === 'Joe');
      done();
    });
  });
});
