const mongoose = require('mongoose');
//!use the ES6 default promise instead of Mongoose's own
mongoose.Promise = global.Promise;

//? BEFORE //? DONE
before((done) => {
  mongoose.connect('mongodb://localhost/users_test', { useNewUrlParser: true });
  mongoose.connection
    .once('open', () => {
      done();
    })
    .on('error', (error) => {
      console.warn('Warning', error);
    });
});

//? beforeEach
beforeEach((done) => {
  const { user, comments, blogposts } = mongoose.connection.collections;
  //? drop accepts a callback to be executed AFTER the drop
  //! we need to nest these callbacks because Mongo CANNOT delete multiple collections at the same time!
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done();
      });
    });
  });
});

//#DONE
/**
 * is a callback function provided automatically by Mocha.
 * It is implicitly present as an argument in each Mocha function
 * so inside the beforeEach hook, for example, we have a first argument of done, that we can call to tell mocha to proceed to next operation
 *
 */

//# before Hook
/**
 *  before is a Mocha hook, it gets called just once.
 * It allows us to reference the done function so that we can wait to perform the operation (in this case the connection) and only at the end, in case of success, trigger the done() function and run other tests
 *  */

//# beforeEach Hook
/**
 * beforeEach is a Mocha hook, it gets called before any operation, and it is invoked with a done function that we must call to inform mocha that the current operation is completed.
 */
