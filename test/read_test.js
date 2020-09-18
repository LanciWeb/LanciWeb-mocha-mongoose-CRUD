const assert = require('assert');
const User = require('../src/models/user');

describe('Reading users', () => {
  // We are manually adding this user here because in the main mocha file (test_helper) we are running a
  let joe;
  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    jill = new User({ name: 'Jill' });
    mark = new User({ name: 'Mark' });
    mike = new User({ name: 'Mike' });
    Promise.all([joe.save(), jill.save(), mark.save(), mike.save()]).then(() =>
      done()
    );
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

  it('can skip and limit - paginate', (done) => {
    User.find({})
      .sort({ name: 1 }) //! super important: if we don't sort, we cannot be sure that the order is the same we expect
      .skip(1)
      .limit(2)
      .then((users) => {
        assert(users.length === 2);
        const userNames = users.map((u) => u.name);
        console.log(userNames);
        assert(userNames.includes('Joe'));
        assert(userNames.includes('Mark'));
        done();
      });
  });
});

//# PAGINATION - sort, skip and limit modifiers
/**
 * the sort, skip and limit modifiers are very useful for pagination.
 * By combining their values, we can restrict the results of the query to a window of results.
 */
