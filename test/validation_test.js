const assert = require('assert');
const User = require('../src/user');

describe('validtation tests', () => {
  it('Requires a user name', (done) => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === 'Name is required.');
    done();
  });

  it('Validates user name length', (done) => {
    const user = new User({ name: 'Al' });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === 'Name must be longer than 2 characters');
    done();
  });

  //? we test we are able to catch validation error coming from the attempts of saving invalid records
  it('prevent invalid records from being saved', (done) => {
    const user = new User({ name: 'Al' });
    user.save().catch((validationResult) => {
      const { message } = validationResult.errors.name;
      assert(message === 'Name must be longer than 2 characters');
      done();
    });
  });
});

//# validateSync function
/**
 * the validateSync function of mongoose is used to validate
 * some model immediately on the same line. It returns a validationResult object that can be assigned to a variable to perform our tests and checks. It s useful when all we need to test is inside or model without need to reach again the database for other information
 *
 * | const validationResult = user.validateSync()
 *
 */

//#validate function
/**
 * the validate function of mongoose is used to validate some model in asyncronous fashion. We pass it a function which receive a validationResult object that we can use to perform our checks. It is useful if we need to reach some other data from the database in order to perform our tests.
 *
 * | user.validate((validationResult) => {
 * |  //reach database again or other async stuff
 * | })
 *
 */
