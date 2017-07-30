const http = require('http');
const url = require('url');

const axios = require('axios');
const request = require('request');
const superagent = require('superagent');
const fetch = require('node-fetch');

const httpMatchers = require('../../src');
const createServer = require('./create-server');

// Load our matchers
expect.extend(httpMatchers);

// Start a simple server for testing purposes
const { start, stop, baseUrl } = createServer();
beforeAll(start);
afterAll(stop);

describe('.toHaveStatus', () => {
  describe('should match 200 status code', () => {
    it('axios', () =>
      axios({
        method: 'GET',
        url: `${baseUrl()}/status/200`,
        validateStatus: () => true, // Make all requests resolve promise
      }).then(response => {
        expect(response).toHaveStatus(200);
      }));

    it('request', done => {
      request(
        {
          method: 'GET',
          url: `${baseUrl()}/status/200`,
        },
        (err, response) => {
          expect(response).toHaveStatus(200);
          done();
        }
      );
    });

    it('superagent', () =>
      superagent.get(`${baseUrl()}/status/200`).then(response => {
        expect(response).toHaveStatus(200);
      }));

    it('fetch', () =>
      fetch(`${baseUrl()}/status/200`).then(response => {
        expect(response).toHaveStatus(200);
      }));

    it('vanilla node', done => {
      const parsedUrl = url.parse(baseUrl());
      http.get(
        {
          host: parsedUrl.hostname,
          port: parsedUrl.port,
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
    it('axios', () =>
      axios({
        method: 'GET',
        url: `${baseUrl()}/status/400`,
        validateStatus: () => true, // Make all requests resolve promise
      }).then(response => {
        expect(response).toHaveStatus(400);
      }));

    it('request', done => {
      request(
        {
          method: 'GET',
          url: `${baseUrl()}/status/400`,
        },
        (err, response) => {
          expect(response).toHaveStatus(400);
          done();
        }
      );
    });

    it('superagent', () =>
      superagent.get(`${baseUrl()}/status/400`).catch(response => {
        expect(response).toHaveStatus(400);
      }));

    it('fetch', () =>
      fetch(`${baseUrl()}/status/400`).then(response => {
        expect(response).toHaveStatus(400);
      }));

    it('vanilla node', done => {
      const parsedUrl = url.parse(baseUrl());
      http.get(
        {
          host: parsedUrl.hostname,
          port: parsedUrl.port,
          path: '/status/400',
        },
        response => {
          expect(response).toHaveStatus(400);
          done();
        }
      );
    });
  });

  describe('should not match code', () => {
    it('axios', () =>
      axios({
        method: 'GET',
        url: `${baseUrl()}/status/400`,
        validateStatus: () => true, // Make all requests resolve promise
      }).then(response => {
        expect(() => {
          expect(response).toHaveStatus(200);
        }).toThrow(/Expected response to have a status of/);
      }));

    it('request', done => {
      request(
        {
          method: 'GET',
          url: `${baseUrl()}/status/400`,
        },
        (err, response) => {
          expect(() => {
            expect(response).toHaveStatus(200);
          }).toThrow(/Expected response to have a status of/);
          done();
        }
      );
    });

    it('superagent', () =>
      superagent.get(`${baseUrl()}/status/400`).catch(response => {
        expect(() => {
          expect(response).toHaveStatus(200);
        }).toThrow(/Expected response to have a status of/);
      }));

    it('fetch', () =>
      fetch(`${baseUrl()}/status/400`).then(response => {
        expect(() => {
          expect(response).toHaveStatus(200);
        }).toThrow(/Expected response to have a status of/);
      }));

    it('vanilla node', done => {
      const parsedUrl = url.parse(baseUrl());
      http.get(
        {
          host: parsedUrl.hostname,
          port: parsedUrl.port,
          path: '/status/400',
        },
        response => {
          expect(() => {
            expect(response).toHaveStatus(200);
          }).toThrow(/Expected response to have a status of/);
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
