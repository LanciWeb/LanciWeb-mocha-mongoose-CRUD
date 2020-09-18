const mongoose = require('Mongoose');
const User = require('../src/models/user');
const Comment = require('../src/models/comment');
const BlogPost = require('../src/models/blogPost');

describe('Associations tests', () => {
  let joe, blogPost, comment;
  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({
      title: 'JS is Great',
      content: 'Yep it really is',
    });
    comment = new Comment({ content: 'Congrats on great post.' });

    //#has Many Relationship assignation
    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);

    //# has one Relationship assignation
    comment.user = joe;

    Promise.all([joe.save(), comment.save(), blogPost.save()]).then(() =>
      done()
    );
  });

  it('saves a relation between a user and a blogpost', (done) => {
    User.findOne({ name: 'Joe' }).then((user) => {
      console.log(user);
      done();
    });
  });
});

//#has Many Relationship assignation
/**
 * even though this is not a subdocument, we create the relationship in the same fashion: by pushing a model instance into the property of the relationship owner as it were a simple array.
 * ! we need to save after the assignation
 *
 * ? Even though the schema expects an array of object Id as a type, mongoose takes care of that!
 */

//# has one Relationship assignation
/**
 * Also in this case, we can treat the association as it was a simple property, that is, by directly assigning the instance we want to tie to the owner of the relationship.
 * ! we need to save after the assignation
 *
 * ? Even though the schema expects an object Id as a type, mongoose takes care of that!
 */
