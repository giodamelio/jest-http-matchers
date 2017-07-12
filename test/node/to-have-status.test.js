const axios = require('axios');
const express = require('express');

const httpMatchers = require('../../src');

expect.extend(httpMatchers);

let server, port;
beforeAll(done => {
  server = express();
  server.get('/', (req, res) => {
    res.json({
      test: 'haha',
    });
  });
  server = server.listen(2376, () => {
    port = server.address().port;
    done();
  });
});

afterAll(() => {
  server.close();
});

describe('.toHaveStatus', () => {
  it('should match status code', () => {
    return axios({
      method: 'GET',
      url: `http://localhost:${port}/`,
      validateStatus: () => true, // Make all requests resolve promise
    }).then(response => {
      expect(response).toHaveStatus(200);
    });
  });
});
