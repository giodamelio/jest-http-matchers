const matcherUtils = require('jest-matcher-utils');

module.exports.createMessage = function(
  message,
  hint,
  expected,
  received,
  after = ''
) {
  return (
    `${matcherUtils.matcherHint(hint)}\n\n` +
    `${message}\n` +
    `  ${matcherUtils.printExpected(expected)}\n` +
    `Received:\n` +
    `  ${matcherUtils.printReceived(received)}` +
    after
  );
};
