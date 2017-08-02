'use strict';

const http = require('http');
const url = require('url');

const axios = require('axios');
const request = require('request');
const superagent = require('superagent');
const fetch = require('node-fetch');

const httpMatchers = require('../../src');

const { createTests } = require('./test-utils');

// Load our matchers
expect.extend(httpMatchers);

describe('.toHaveStatus', () => {
  describe('should match 200 status code', () => {
    createTests(
      '/status/200',
      response => {
        expect(response).toHaveStatus(200);
      },
      {
        axios: path =>
          axios({
            method: 'GET',
            url: path,
          }),
        request: path =>
          new Promise((resolve, reject) => {
            request(
              {
                method: 'GET',
                url: path,
              },
              (err, response) => {
                if (err) return reject(err);
                return resolve(response);
              }
            );
          }),
        superagent: path => superagent.get(path),
        fetch: path => fetch(path),
        'vanilla node': path =>
          new Promise(resolve => {
            const parsedUrl = url.parse(path);
            http.get(
              {
                host: parsedUrl.hostname,
                port: parsedUrl.port,
                path: parsedUrl.path,
              },
              response => {
                resolve(response);
              }
            );
          }),
      }
    );
  });

  describe('should match 400 status code', () => {
    createTests(
      '/status/400',
      response => {
        expect(response).toHaveStatus(400);
      },
      {
        axios: path =>
          axios({
            method: 'GET',
            url: path,
            validateStatus: () => true, // Make all requests resolve promise
          }),
        request: path =>
          new Promise((resolve, reject) => {
            request(
              {
                method: 'GET',
                url: path,
              },
              (err, response) => {
                if (err) return reject(err);
                return resolve(response);
              }
            );
          }),
        superagent: path => superagent.get(path).ok(() => true), // Make all requests resolve promise
        fetch: path => fetch(path),
        'vanilla node': path =>
          new Promise(resolve => {
            const parsedUrl = url.parse(path);
            http.get(
              {
                host: parsedUrl.hostname,
                port: parsedUrl.port,
                path: parsedUrl.path,
              },
              response => {
                resolve(response);
              }
            );
          }),
      }
    );
  });

  describe('should not match code', () => {
    createTests(
      '/status/400',
      response => {
        expect(() => {
          expect(response).toHaveStatus(200);
        }).toThrow(/Expected response to have a status of/);
      },
      {
        axios: path =>
          axios({
            method: 'GET',
            url: path,
            validateStatus: () => true, // Make all requests resolve promise
          }),
        request: path =>
          new Promise((resolve, reject) => {
            request(
              {
                method: 'GET',
                url: path,
              },
              (err, response) => {
                if (err) return reject(err);
                return resolve(response);
              }
            );
          }),
        superagent: path => superagent.get(path).ok(() => true), // Make all requests resolve promise
        fetch: path => fetch(path),
        'vanilla node': path =>
          new Promise(resolve => {
            const parsedUrl = url.parse(path);
            http.get(
              {
                host: parsedUrl.hostname,
                port: parsedUrl.port,
                path: parsedUrl.path,
              },
              response => {
                resolve(response);
              }
            );
          }),
      }
    );
  });

  it('have status property', () => {
    expect(() => {
      expect({}).toHaveStatus(200);
    }).toThrow(/Expected request to have status property/);
  });
});
