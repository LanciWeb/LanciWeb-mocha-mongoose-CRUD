const assert = require('assert');
const User = require('../src/models/user');

describe('Subdocuments', () => {
  it('can crete a subdocument', (done) => {
    const joe = new User({ name: 'Joe', posts: [{ title: 'post title' }] });
    joe
      .save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'post title');
        done();
      });
  });
});
