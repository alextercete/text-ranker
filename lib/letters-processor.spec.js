var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

var LettersProcessor = require('./letters-processor');

describe('LettersProcessor', function () {
  var lettersProcessor, storage;

  beforeEach(function () {
    storage = {
      incrementMemberScore: sinon.spy()
    };

    lettersProcessor = new LettersProcessor(storage);
  });

  it('should process text containing a single letter', function () {
    lettersProcessor.processText('o');
    expect(storage.incrementMemberScore).to.have.been.calledWith('letters', 'o', 1);
  });

  it('should process text case-insensitively', function () {
    lettersProcessor.processText('O');
    expect(storage.incrementMemberScore).to.have.been.calledWith('letters', 'o', 1);
  });

  it('should process text containing multiple occurrences of a single letter', function () {
    lettersProcessor.processText('Ooo');
    expect(storage.incrementMemberScore).to.have.been.calledWith('letters', 'o', 3);
  });

  it('should process text containing multiple occurrences of multiple letters and punctuation', function () {
    lettersProcessor.processText('Ooo, I\'m still alive');

    expect(storage.incrementMemberScore).to.have.callCount(9);
    expect(storage.incrementMemberScore).to.have.been.calledWith('letters', 'o', 3);
    expect(storage.incrementMemberScore).to.have.been.calledWith('letters', 'i', 3);
    expect(storage.incrementMemberScore).to.have.been.calledWith('letters', 'm', 1);
    expect(storage.incrementMemberScore).to.have.been.calledWith('letters', 's', 1);
    expect(storage.incrementMemberScore).to.have.been.calledWith('letters', 't', 1);
    expect(storage.incrementMemberScore).to.have.been.calledWith('letters', 'l', 3);
    expect(storage.incrementMemberScore).to.have.been.calledWith('letters', 'a', 1);
    expect(storage.incrementMemberScore).to.have.been.calledWith('letters', 'v', 1);
    expect(storage.incrementMemberScore).to.have.been.calledWith('letters', 'e', 1);
  });
});
