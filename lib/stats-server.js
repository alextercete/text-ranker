var http = require('http');

module.exports = function StatsServer(storage) {
  this.start = start;

  function createServer() {
    return http.createServer(function (request, response) {
      if (request.url === '/stats') {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify(getStats()));
      } else {
        response.statusCode = 404;
      }

      response.end();
    });
  }

  function getStats() {
    // TODO: Return actual stats
    return {};
  }

  function start(port) {
    var server = createServer();
    server.listen(port);
  }
};
