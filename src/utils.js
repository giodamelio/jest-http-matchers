const matcherUtils = require('jest-matcher-utils');

module.exports.createMessage = function(
  matcherContext,
  message,
  name,
  expected,
  received,
  after = ''
) {
  const matcherHint = matcherContext.isNot ? `.not.${name}` : `.${name}`;
  return (
    `${matcherUtils.matcherHint(matcherHint)}\n\n` +
    `${message}\n` +
    `  ${matcherUtils.printExpected(expected)}\n` +
    `Received:\n` +
    `  ${matcherUtils.printReceived(received)}` +
    after
  );
};
