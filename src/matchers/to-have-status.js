const matcherUtils = require('jest-matcher-utils');

const utils = require('../utils');

module.exports = function toHaveStatus(received, expected) {
  const status = received.statusCode || received.status;

  if (!status) {
    return {
      pass: false,
      message: `Expected request to have status property\n\n${matcherUtils.printReceived(
        received
      )}`,
    };
  }

  const pass = status === expected;

  if (pass) {
    return {
      pass: true,
      message: utils.createMessage(
        this,
        'Expected response not to have a status of:',
        'toHaveStatus',
        expected,
        status
      ),
    };
  }

  return {
    pass: false,
    message: utils.createMessage(
      this,
      'Expected response to have a status of:',
      'toHaveStatus',
      expected,
      status
    ),
  };
};
