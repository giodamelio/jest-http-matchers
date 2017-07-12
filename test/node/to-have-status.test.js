const http = require('http');
const { URL } = require('url');

const axios = require('axios');
const request = require('request');
const superagent = require('superagent');

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

    it('request', done => {
      request(
        {
          method: 'GET',
          url: `${baseUrl()}/status/200`,
        },
        (err, response, body) => {
          expect(response).toHaveStatus(200);
          done();
        }
      );
    });

    it('superagent', () => {
      return superagent.get(`${baseUrl()}/status/200`).then(response => {
        expect(response).toHaveStatus(200);
      });
    });

    it('vanilla node', done => {
      const url = new URL(baseUrl());
      http.get(
        {
          host: url.hostname,
          port: url.port,
          path: '/status/200',
        },
        response => {
          expect(response).toHaveStatus(200);
          done();
        }
      );
    });
  });
});
