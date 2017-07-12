const axios = require('axios');

const httpMatchers = require('../../src');
const createServer = require('./createServer');

// Load our matchers
expect.extend(httpMatchers);

// Start a simple server for testing purposes
const { start, stop, baseUrl } = createServer();
beforeAll(start);
afterAll(stop);

describe('.toHaveStatus', () => {
  describe('should match status code', () => {
    it('axios', () => {
      return axios({
        method: 'GET',
        url: `${baseUrl()}/status/200`,
        validateStatus: () => true, // Make all requests resolve promise
      }).then(response => {
        expect(response).toHaveStatus(200);
      });
    });
  });
});
