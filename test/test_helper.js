const mongoose = require('mongoose');
//!use the ES6 default promise instead of Mongoose's own
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/users_test', { useNewUrlParser: true });
mongoose.connection
  .once('open', () => console.log('Good to go!'))
  .on('error', (error) => {
    console.warn('Warning', error);
  });

//? beforeEach is a Mocha hook; it gets called with done(), to be called when we finish to tell Mocha to proceed
beforeEach((done) => {
  //? drop accepts a callback to be executed AFTER the drop
  mongoose.connection.collections.users.drop(() => {
    //when we are here, we have finished drop.
    //invoking done, tells Mocha that we are ready to run the next test!
    done();
  });
});
