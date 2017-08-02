'use strict';

/* eslint-disable prefer-template */
const os = require('os');

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
    `${matcherUtils.matcherHint(matcherHint)}${os.EOL}${os.EOL}` +
    `${message}${os.EOL}` +
    `  ${matcherUtils.printExpected(expected)}${os.EOL}` +
    `Received:${os.EOL}` +
    `  ${matcherUtils.printReceived(received)}` +
    after
  );
}

module.exports = {
  createMessage,
};
