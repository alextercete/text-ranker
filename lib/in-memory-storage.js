var _ = require('lodash');

module.exports = function InMemoryStorage() {
  var sets = {};

  this.count = count;
  this.getHighestScoringMembers = getHighestScoringMembers;
  this.getMemberScore = getMemberScore;
  this.incrementMemberScore = incrementMemberScore;

  function count(set) {
    return _.keys(sets[set]).length;
  }

  function ensureMemberExists(set, member) {
    var members = sets[set];

    if (!members) {
      members = sets[set] = {};
    }

    if (!members[member]) {
      members[member] = 0;
    }
  }

  function getHighestScoringMembers(set, count) {
    return _.chain(sets[set])
      .pairs()
      .sortByOrder(pairValue, 'desc')
      .take(count)
      .map(pairKey)
      .value();
  }

  function getMemberScore(set, member) {
    return sets[set][member];
  }

  function incrementMemberScore(set, member, increment) {
    ensureMemberExists(set, member);
    sets[set][member] += increment;
  }

  function pairKey(keyValuePair) {
    return keyValuePair[0];
  }

  function pairValue(keyValuePair) {
    return keyValuePair[1];
  }
};
