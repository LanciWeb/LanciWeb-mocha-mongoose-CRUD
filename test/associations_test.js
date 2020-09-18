const assert = require('assert');
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

  //? it only makes mocha run ONLY this test
  it('saves a relation between a user and a blogpost', (done) => {
    User.findOne({ name: 'Joe' })
      .populate('blogPosts') //# populate
      .then((user) => {
        // console.log(user);
        assert(user.blogPosts[0].title === 'JS is Great');
        done();
      });
  });

  it('save user nested relationships', (done) => {
    User.findOne({ name: 'Joe' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: { path: 'user', model: 'user' },
        },
      })
      .then((user) => {
        assert(user.name === 'Joe');
        assert(user.blogPosts[0].title === 'JS is Great');
        assert(
          user.blogPosts[0].comments[0].content === 'Congrats on great post.'
        );
        assert(user.blogPosts[0].comments[0].user.name === 'Joe');
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

//# POPULATE modifier
/**
 * In Mongo, if we fetch an instance of a model, we get the ids of the related models, not the entire object.
 * If we want to load the entire object, for example the entire post object of a user, we need to use the populate modifier.
 *
 * Modifiers are functions that enhance our queries and can be chained before resolving the promise (before the .then());
 * We pass to populate a string for each relationship we want to populate. the string must match the relation property name in the schema
 *
 * | User.findOne({ name: 'Joe' }).populate('blogPosts').then()
 *
 */

//# POPULATE Deep Nested relationship
/**
 * Using the populate modifier as shown above, will only expand 1 level. so for example the blog posts belonginh to the user, but not the comments belonging to the post, nor the authors of the comments).
 *
 * In order to dive into deeply nested relationship we must provide a configuration object to populate().
 * The object accepts a 'path' and a 'populate' property
 * The path property corresponds to the string property we want to populate.
 * the populate property accepts again 'path' and 'model' where path is the name of the property and 'model' the actual name of the mode. We can also assign to this populate object another populate prop, which is again a populate object so that we could recursively retrieve all the nested relationships
 *
 * ? so for instance, we want to retreive a users, populate his blog posts, populate the comments of each blog post, and the user (author) of each comment:
 * | User.findOne({ name: 'Joe' })
 * |   .populate({
 * |      path: 'blogPosts',
 * |      populate: {
 * |        path: 'comments',
 * |        model: 'comment',
 * |        populate: { path: 'user', model: 'user' },
 * |      },
 * |   )}.then()
 */
