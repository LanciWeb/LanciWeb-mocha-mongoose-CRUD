const assert = require('assert');
const { Mongoose } = require('mongoose');
const User = require('../src/user');

describe('Creating records', () => {
  it('saves a user', (done) => {
    const joe = new User({ name: 'Joe' });

    joe.save().then(() => {
      assert(!joe.isNew); //#isNew
      done();
    });
  });
});

//# DESCRIBE FUNCTIONS
/**
 * is the function where you describe the purpose of the following tests
 * it has a description string, used by Mocha just for logs and a bunch of
 * it functions
 */

//# IT FUNCTIONS
/**
 * They are the actual tests. they take the same arguments as Describe
 * Mocha is going to run them one after another.
 * Inside an it function, we need to make an ASSERTION,
 *
 */

//#ASSERTIONS
/**
 * the assertions come from the mocha library, but we need to import them
 * with a requirement statement.
 * Inside an assertion we usually want a boolean,
 * that is "I expect this outcome" from the following code
 * if that is true, then the test is passed, otherwise it fails
 */

//#Running a test
/**
 * Inside a project where mocha is installed, we need to run 'npm run test'.
 * !if that does not work, add a "test":"mocha" in package.json scripts
 */

//#HOOKS
/**
 * Hooks are functions that can be run before, after or in some specific
 * moments during the tests.
 * ? beforeEach (test_helper.js)
 * is runs before each operation
 */

//#DONE
/**
 * is a callback function provided automatically by Mocha.
 * It is implicitly present as an argument in each Mocha function
 * so inside the beforeEach hook, for example, we have a first argument of done, that we can call to tell mocha to proceed to next operation
 *
 */

//#isNew
/**
 * whenever a model is created with mongoose,
 * mongoose assigns t a flag of isNew === true.
 * As soon as the model has been saved in the database,
 * the flag is set to false.
 * We can use this flag to test whether a model instance has been successfully saved
 */
