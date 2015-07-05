var http = require('http');

var StatsProvider = require('./stats-provider');

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
    var statsProvider = getStatsProvider();

    return {
      count: statsProvider.getWordsCount(),
      top5words: statsProvider.getMostPopularWords(5),
      top5letters: statsProvider.getMostPopularLetters(5)
    };
  }

  function getStatsProvider() {
    return new StatsProvider(storage);
  }

  function start(port) {
    var server = createServer();
    server.listen(port);
  }
};
