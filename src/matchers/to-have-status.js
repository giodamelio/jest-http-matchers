const utils = require('../utils');

module.exports = function toHaveStatus(received, expected) {
  const status = received.statusCode || received.status;
  const pass = status === expected;

  if (pass) {
    return {
      pass: true,
      message: utils.createMessage(
        'Expected response not to have a status of:',
        '.not.toHaveStatus',
        expected,
        status
      ),
    };
  }

  return {
    pass: false,
    message: utils.createMessage(
      'Expected response to have a status of:',
      '.toHaveStatus',
      expected,
      status
    ),
  };
};
