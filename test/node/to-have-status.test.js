const axios = require('axios');
const express = require('express');

const httpMatchers = require('../../src');
const createServer = require('./createServer');

// Load our matchers
expect.extend(httpMatchers);

// Start a simple server for testing purposes
const { start, stop } = createServer();
let PORT;
beforeAll(() => start().then(port => (PORT = port)));
afterAll(stop);

describe('.toHaveStatus', () => {
  it('should match status code', () => {
    return axios({
      method: 'GET',
      url: `http://localhost:${PORT}/status/200`,
      validateStatus: () => true, // Make all requests resolve promise
    }).then(response => {
      expect(response).toHaveStatus(200);
    });
  });
});
