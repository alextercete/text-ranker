var net = require('net');

module.exports = function TextProcessorServer(storage) {
  this.start = start;

  function createServer() {
    return net.createServer(function (socket) {
      socket.on('data', function (data) {
        processText(data.toString());
      });
    });
  }

  function processText(text) {
    // TODO: Do actual processing
  }

  function start(port) {
    var server = createServer();
    server.listen(port);
  }
};
