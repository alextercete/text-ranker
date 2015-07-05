var _ = require('lodash');
var net = require('net');

var LettersProcessor = require('./letters-processor');
var WordsProcessor = require('./words-processor');

module.exports = function TextProcessorServer(storage) {
  this.start = start;

  function createServer() {
    return net.createServer(function (socket) {
      socket.on('data', function (data) {
        processText(data.toString());
      });
    });
  }

  function getProcessors() {
    return [
      new WordsProcessor(storage),
      new LettersProcessor(storage)
    ];
  }

  function processText(text) {
    var processors = getProcessors();

    _.forEach(processors, function (processor) {
      processor.processText(text);
    });
  }

  function start(port) {
    var server = createServer();
    server.listen(port);
  }
};
