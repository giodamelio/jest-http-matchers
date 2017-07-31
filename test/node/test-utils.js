const express = require('express');

function createServer() {
  let server;
  let port;
  const app = express();

  app.get('/', (req, res) => {
    res.send('Hello World');
  });

  app.get('/status/:status', (req, res) => {
    res.status(req.params.status);
    res.send(`Sent status code: ${req.params.status}`);
  });

  return {
    start() {
      return new Promise(resolve => {
        server = app.listen(0, () => {
          port = server.address().port;
          resolve();
        });
      });
    },
    stop() {
      server.close();
      return Promise.resolve();
    },
    baseUrl() {
      return `http://localhost:${port}`;
    },
  };
}

function createTests(path, assertionsCallback, requesters) {
  const { start, stop, baseUrl } = createServer();
  beforeAll(start);
  afterAll(stop);

  Object.keys(requesters).forEach(requester => {
    it(`${requester}`, () =>
      requesters[requester](`${baseUrl()}${path}`).then(response => {
        assertionsCallback(response);
      }));
  });
}

module.exports = {
  createServer,
  createTests,
};
