const http = require('http');
const { URL } = require('url');

const axios = require('axios');
const request = require('request');
const superagent = require('superagent');
const fetch = require('node-fetch');

const httpMatchers = require('../../src');
const createServer = require('./createServer');

// Load our matchers
expect.extend(httpMatchers);

// Start a simple server for testing purposes
const { start, stop, baseUrl } = createServer();
beforeAll(start);
afterAll(stop);

describe('.toHaveStatus', () => {
  describe('should match 200 status code', () => {
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

    it('fetch', () => {
      return fetch(`${baseUrl()}/status/200`).then(response => {
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

  describe('should match 400 status code', () => {
    it('axios', () => {
      return axios({
        method: 'GET',
        url: `${baseUrl()}/status/400`,
        validateStatus: () => true, // Make all requests resolve promise
      }).then(response => {
        expect(response).toHaveStatus(400);
      });
    });

    it('request', done => {
      request(
        {
          method: 'GET',
          url: `${baseUrl()}/status/400`,
        },
        (err, response, body) => {
          expect(response).toHaveStatus(400);
          done();
        }
      );
    });

    it('superagent', () => {
      return superagent.get(`${baseUrl()}/status/400`).catch(response => {
        expect(response).toHaveStatus(400);
      });
    });

    it('fetch', () => {
      return fetch(`${baseUrl()}/status/400`).then(response => {
        expect(response).toHaveStatus(400);
      });
    });

    it('vanilla node', done => {
      const url = new URL(baseUrl());
      http.get(
        {
          host: url.hostname,
          port: url.port,
          path: '/status/400',
        },
        response => {
          expect(response).toHaveStatus(400);
          done();
        }
      );
    });
  });

  it('have status property', () => {
    expect(() => {
      expect({}).toHaveStatus(200);
    }).toThrow(/Expected request to have status property/);
  });
});
