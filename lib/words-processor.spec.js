var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

var WordsProcessor = require('./words-processor');

describe('WordsProcessor', function () {
  var storage, wordsProcessor;

  beforeEach(function () {
    storage = {
      incrementMemberScore: sinon.spy()
    };

    wordsProcessor = new WordsProcessor(storage);
  });

  it('should process text containing a single word', function () {
    wordsProcessor.processText('Bang');
    expect(storage.incrementMemberScore).to.have.been.calledWith('words', 'Bang', 1);
  });

  it('should process text containing multiple occurrences of a single word', function () {
    wordsProcessor.processText('Bang Bang');
    expect(storage.incrementMemberScore).to.have.been.calledWith('words', 'Bang', 2);
  });

  it('should process text containing multiple occurrences of multiple words and punctuation', function () {
    wordsProcessor.processText('Bang, Bang; Bangity Bang. I said Bang Bang, Bangity Bang');

    expect(storage.incrementMemberScore).to.have.callCount(4);
    expect(storage.incrementMemberScore).to.have.been.calledWith('words', 'Bang', 6);
    expect(storage.incrementMemberScore).to.have.been.calledWith('words', 'Bangity', 2);
    expect(storage.incrementMemberScore).to.have.been.calledWith('words', 'I', 1);
    expect(storage.incrementMemberScore).to.have.been.calledWith('words', 'said', 1);
  });
});
