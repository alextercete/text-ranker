var expect = require('chai').expect;

var InMemoryStorage = require('../lib/in-memory-storage');
var TextProcessorServer = require('../lib/text-processor-server');
var StatsServer = require('../lib/stats-server');

var http = require('http');
var net = require('net');

describe('Stats', function () {
  var inMemoryStorage, statsServer, textProcessorServer;

  beforeEach(function () {
    inMemoryStorage = new InMemoryStorage();
    textProcessorServer = new TextProcessorServer(inMemoryStorage);
    statsServer = new StatsServer(inMemoryStorage);
  });

  it.skip('should be provided for processed text', function (done) {
    textProcessorServer.start(5555);
    statsServer.start(8080);

    var text =  'One and two. One, two and three. One, two, three and four. One, two, three, four and five.';
    sendTcpMessage('127.0.0.1', 5555, text, function () {

      getJson('http://127.0.0.1:8080/stats', function (stats) {
        expect(stats).to.deep.equal({
          count: 6,
          top5words: ['One', 'and', 'two', 'three', 'four'],
          top5letters: ['e', 'o', 'n', 't', 'r']
        });

        done();
      });

    });
  });
});

function getJson(url, callback) {
  http.get(url, function (response) {
    var body = '';

    response.setEncoding('utf8');

    response.on('data', function (chunk) {
      body += chunk;
    });

    response.on('end', function () {
      body = JSON.parse(body);
      callback(body);
    });
  });
}

function sendTcpMessage(host, port, message, callback) {
  var client = new net.Socket();

  client.connect(port, host, function () {
    client.write(message);
    client.end(callback);
  });
}
