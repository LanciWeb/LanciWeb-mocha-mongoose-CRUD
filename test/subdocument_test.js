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

  it('can add subdocuments to an existing record', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [],
    });

    joe
      .save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        user.posts.push({ title: 'New Post' });
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'New Post');
        done();
      });
  });

  it('Can remove existing subdocument', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'new title' }],
    });

    joe
      .save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        user.posts[0].remove();
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts.length === 0);
        done();
      });
  });
});
