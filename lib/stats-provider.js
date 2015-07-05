module.exports = function StatsProvider(storage) {
  this.getMostPopularLetters = getMostPopularLetters;
  this.getMostPopularWords = getMostPopularWords;
  this.getWordsCount = getWordsCount;

  function getMostPopularLetters(count) {
    return storage.getHighestScoringMembers('letters', count);
  }

  function getMostPopularWords(count) {
    return storage.getHighestScoringMembers('words', count);
  }

  function getWordsCount() {
    return storage.count('words');
  }
};
