'use strict';

const superagent = require('superagent');

const { createServer } = require('./test-utils');

it('start and stop server', () => {
  const { start, stop } = createServer();
  return start().then(stop);
});

// Start a simple server for testing purposes
const { start, stop, baseUrl } = createServer();
beforeAll(start);
afterAll(stop);

it('get root', () =>
  superagent(`${baseUrl()}/`).then(response => {
    expect(response.text).toBe('Hello World');
  }));

it('get status', () =>
  superagent(`${baseUrl()}/status/205`).then(response => {
    expect(response.status).toBe(205);
  }));
