'use strict';

const { createMessage } = require('../src/utils');

it('create message', () => {
  expect(
    createMessage(
      this,
      'Expected test to do a thingy (totally, I promise)',
      'matcherName',
      'expected thingy',
      'received thingy'
    )
  ).toMatchSnapshot();
});

it('create message with not applied', () => {
  expect(
    createMessage(
      { isNot: true },
      'Expected test to do a thingy (totally, I promise)',
      'matcherName',
      'expected thingy',
      'received thingy'
    )
  ).toMatchSnapshot();
});
