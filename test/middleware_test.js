const assert = require('assert');
const mongoose = require('mongoose');
const User = require('../src/models/user');
const BlogPost = require('../src/models/blogPost');
describe('middleware', () => {
  let joe, blogPost;
  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({
      title: 'JS is Great',
      content: 'Yep it really is',
    });

    //#has Many Relationship assignation
    joe.blogPosts.push(blogPost);

    //# has one Relationship assignation

    Promise.all([joe.save(), blogPost.save()]).then(() => done());
  });

  it('when user is deleted also blogPosts are removed', (done) => {
    joe
      .remove()
      .then(() => BlogPost.countDocuments())
      .then((count) => {
        console.log(count);
        assert(count === 0);
        done();
      });
  });
});
