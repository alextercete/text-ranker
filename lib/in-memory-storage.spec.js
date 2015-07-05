var expect = require('chai').expect;
var sinon = require('sinon');

var InMemoryStorage = require('./in-memory-storage');

describe('InMemoryStorage', function () {
  var inMemoryStorage;
  var anyScore = 10;

  beforeEach(function () {
    inMemoryStorage = new InMemoryStorage();
  });

  it('should count members of an inexistent set', function () {
    expect(inMemoryStorage.count('inexistent set')).to.equal(0);
  });

  it('should count members of a set', function () {
    inMemoryStorage.incrementMemberScore('the set', 'one member', anyScore);
    inMemoryStorage.incrementMemberScore('the set', 'another member', anyScore);

    expect(inMemoryStorage.count('the set')).to.equal(2);
  });

  it('should provide highest scoring members of an inexistent set', function () {
    expect(inMemoryStorage.getHighestScoringMembers('inexistent set', 3)).to.deep.equal([]);
  });

  it('should provide highest scoring members', function () {
    inMemoryStorage.incrementMemberScore('the set', 'forth', 40);
    inMemoryStorage.incrementMemberScore('the set', 'third', 60);
    inMemoryStorage.incrementMemberScore('the set', 'second', 80);
    inMemoryStorage.incrementMemberScore('the set', 'first', 100);

    expect(inMemoryStorage.getHighestScoringMembers('the set', 3)).to.deep.equal(['first', 'second', 'third']);
  });

  it('should be able to increment the score of an existing member', function () {
    inMemoryStorage.incrementMemberScore('the set', 'the member', 1);
    inMemoryStorage.incrementMemberScore('the set', 'the member', 1);

    expect(inMemoryStorage.getMemberScore('the set', 'the member')).to.equal(2);
  });
});
