const { createMessage } = require('../src/utils');

it('create message', () => {
  expect(
    createMessage(
      'Expected test to do a thingy (totally, I promise)',
      'the.name.of.the.matcher',
      'expected thingy',
      'received thingy'
    )
  ).toMatchSnapshot();
});
