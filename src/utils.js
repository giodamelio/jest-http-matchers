/* eslint-disable prefer-template */
const matcherUtils = require('jest-matcher-utils');

function createMessage(
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
}

module.exports = {
  createMessage,
};
