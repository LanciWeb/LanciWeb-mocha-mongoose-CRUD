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

const assert = require('assert');

describe('Creating records', () => {
  it('saves a user', () => {
    assert(1 + 1 === 2);
  });
});
