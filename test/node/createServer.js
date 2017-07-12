const express = require('express');

module.exports = function() {
  let server;
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
      return new Promise((resolve, reject) => {
        server = app.listen(0, () => {
          resolve(server.address().port);
        });
      });
    },
    stop() {
      server.close();
    },
  };
};
