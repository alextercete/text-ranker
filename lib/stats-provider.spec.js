var expect = require('chai').expect;
var sinon = require('sinon');

var StatsProvider = require('./stats-provider');

describe('StatsProvider', function () {
  var statsProvider, storage;

  beforeEach(function () {
    storage = {
      count: sinon.stub(),
      getHighestScoringMembers: sinon.stub()
    };

    statsProvider = new StatsProvider(storage);
  });

  it('should provide the words count', function () {
    storage.count.withArgs('words').returns(42);
    expect(statsProvider.getWordsCount()).to.equal(42);
  });

  it('should provide the most popular words', function () {
    storage.getHighestScoringMembers.withArgs('words', 3).returns(['one', 'two', 'three']);
    expect(statsProvider.getMostPopularWords(3)).to.deep.equal(['one', 'two', 'three']);
  });

  it('should provide the most popular letters', function () {
    storage.getHighestScoringMembers.withArgs('letters', 3).returns(['a', 'b', 'c']);
    expect(statsProvider.getMostPopularLetters(3)).to.deep.equal(['a', 'b', 'c']);
  });
});
